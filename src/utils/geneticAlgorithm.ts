import {
  Guru,
  Kelas,
  MataPelajaran,
  Ruangan,
  SlotWaktu,
  PreferensiGuru,
} from "@/models/types";

// Define the chromosome structure
interface ScheduleItem {
  mataPelajaranId: number;
  guruId: number;
  kelasId: number;
  ruanganId: number;
  slotWaktuId: number;
}

type Chromosome = ScheduleItem[];

// Define the fitness function parameters
interface FitnessParams {
  hardConstraintWeight: number;
  softConstraintWeight: number;
}

// Define the genetic algorithm parameters
interface GeneticAlgorithmParams {
  populationSize: number;
  generations: number;
  mutationRate: number;
  crossoverRate: number;
  elitismCount: number;
  fitnessParams: FitnessParams;
}

// Define the constraint violation types
interface ConstraintViolation {
  type: string;
  description: string;
  weight: number;
}

// Class to handle the genetic algorithm
export class ScheduleGeneticAlgorithm {
  private params: GeneticAlgorithmParams;
  private mataPelajaran: MataPelajaran[];
  private guru: Guru[];
  private kelas: Kelas[];
  private ruangan: Ruangan[];
  private slotWaktu: SlotWaktu[];
  private preferensiGuru: PreferensiGuru[];
  private population: Chromosome[];
  private fitnessScores: number[];
  private bestChromosome: Chromosome | null = null;
  private bestFitness: number = 0;

  constructor(
    params: GeneticAlgorithmParams,
    mataPelajaran: MataPelajaran[],
    guru: Guru[],
    kelas: Kelas[],
    ruangan: Ruangan[],
    slotWaktu: SlotWaktu[],
    preferensiGuru: PreferensiGuru[],
  ) {
    this.params = params;
    this.mataPelajaran = mataPelajaran;
    this.guru = guru;
    this.kelas = kelas;
    this.ruangan = ruangan;
    this.slotWaktu = slotWaktu;
    this.preferensiGuru = preferensiGuru;
    this.population = [];
    this.fitnessScores = [];
  }

  // Initialize the population with random chromosomes
  public initializePopulation(): void {
    this.population = [];
    for (let i = 0; i < this.params.populationSize; i++) {
      this.population.push(this.generateRandomChromosome());
    }
    this.evaluatePopulation();
  }

  // Generate a random chromosome
  private generateRandomChromosome(): Chromosome {
    const chromosome: Chromosome = [];

    // For each mata pelajaran and kelas combination
    for (const mp of this.mataPelajaran) {
      for (const k of this.kelas.filter(
        (k) => k.tingkat === mp.tingkat && k.jurusan === mp.jurusan,
      )) {
        // Find suitable guru for this mata pelajaran
        const suitableGuru = this.guru.filter((g) =>
          g.bidang_keahlian.includes(mp.nama),
        );
        if (suitableGuru.length === 0) continue;

        // Randomly select a guru, ruangan, and slot waktu
        const randomGuru =
          suitableGuru[Math.floor(Math.random() * suitableGuru.length)];
        const randomRuangan =
          this.ruangan[Math.floor(Math.random() * this.ruangan.length)];
        const randomSlotWaktu = this.slotWaktu.filter((sw) => !sw.is_istirahat);
        if (randomSlotWaktu.length === 0) continue;

        const selectedSlotWaktu =
          randomSlotWaktu[Math.floor(Math.random() * randomSlotWaktu.length)];

        // Add to chromosome
        chromosome.push({
          mataPelajaranId: mp.id,
          guruId: randomGuru.id,
          kelasId: k.id,
          ruanganId: randomRuangan.id,
          slotWaktuId: selectedSlotWaktu.id,
        });
      }
    }

    return chromosome;
  }

  // Evaluate the fitness of the entire population
  private evaluatePopulation(): void {
    this.fitnessScores = this.population.map((chromosome) =>
      this.calculateFitness(chromosome),
    );

    // Update best chromosome if found
    const maxFitnessIndex = this.fitnessScores.indexOf(
      Math.max(...this.fitnessScores),
    );
    if (this.fitnessScores[maxFitnessIndex] > this.bestFitness) {
      this.bestFitness = this.fitnessScores[maxFitnessIndex];
      this.bestChromosome = [...this.population[maxFitnessIndex]];
    }
  }

  // Calculate fitness for a single chromosome
  private calculateFitness(chromosome: Chromosome): number {
    const violations: ConstraintViolation[] = [];

    // Check for hard constraints
    // 1. No guru can teach two classes at the same time
    this.checkGuruTimeConflicts(chromosome, violations);

    // 2. No kelas can have two subjects at the same time
    this.checkKelasTimeConflicts(chromosome, violations);

    // 3. No ruangan can be used by two classes at the same time
    this.checkRuanganTimeConflicts(chromosome, violations);

    // 4. Respect guru unavailability preferences
    this.checkGuruPreferences(chromosome, violations);

    // Check for soft constraints
    // 1. Distribute guru teaching load evenly
    this.checkGuruTeachingLoad(chromosome, violations);

    // 2. Minimize gaps in kelas schedule
    this.checkKelasScheduleGaps(chromosome, violations);

    // Calculate total penalty
    const hardConstraintPenalty =
      violations
        .filter((v) => v.weight >= 1.0)
        .reduce((sum, v) => sum + v.weight, 0) *
      this.params.fitnessParams.hardConstraintWeight;

    const softConstraintPenalty =
      violations
        .filter((v) => v.weight < 1.0)
        .reduce((sum, v) => sum + v.weight, 0) *
      this.params.fitnessParams.softConstraintWeight;

    // Fitness is inversely proportional to penalty
    // A perfect schedule would have a fitness of 1.0
    return 1.0 / (1.0 + hardConstraintPenalty + softConstraintPenalty);
  }

  // Check for guru time conflicts
  private checkGuruTimeConflicts(
    chromosome: Chromosome,
    violations: ConstraintViolation[],
  ): void {
    const guruTimeSlots = new Map<string, ScheduleItem>();

    for (const item of chromosome) {
      const key = `${item.guruId}-${item.slotWaktuId}`;

      if (guruTimeSlots.has(key)) {
        violations.push({
          type: "hard_constraint",
          description: `Guru ID ${item.guruId} assigned to two classes at the same time slot ${item.slotWaktuId}`,
          weight: 10.0,
        });
      } else {
        guruTimeSlots.set(key, item);
      }
    }
  }

  // Check for kelas time conflicts
  private checkKelasTimeConflicts(
    chromosome: Chromosome,
    violations: ConstraintViolation[],
  ): void {
    const kelasTimeSlots = new Map<string, ScheduleItem>();

    for (const item of chromosome) {
      const key = `${item.kelasId}-${item.slotWaktuId}`;

      if (kelasTimeSlots.has(key)) {
        violations.push({
          type: "hard_constraint",
          description: `Kelas ID ${item.kelasId} assigned two subjects at the same time slot ${item.slotWaktuId}`,
          weight: 10.0,
        });
      } else {
        kelasTimeSlots.set(key, item);
      }
    }
  }

  // Check for ruangan time conflicts
  private checkRuanganTimeConflicts(
    chromosome: Chromosome,
    violations: ConstraintViolation[],
  ): void {
    const ruanganTimeSlots = new Map<string, ScheduleItem>();

    for (const item of chromosome) {
      const key = `${item.ruanganId}-${item.slotWaktuId}`;

      if (ruanganTimeSlots.has(key)) {
        violations.push({
          type: "hard_constraint",
          description: `Ruangan ID ${item.ruanganId} assigned to two classes at the same time slot ${item.slotWaktuId}`,
          weight: 10.0,
        });
      } else {
        ruanganTimeSlots.set(key, item);
      }
    }
  }

  // Check guru preferences
  private checkGuruPreferences(
    chromosome: Chromosome,
    violations: ConstraintViolation[],
  ): void {
    for (const item of chromosome) {
      const preference = this.preferensiGuru.find(
        (p) =>
          p.guru_id === item.guruId && p.slot_waktu_id === item.slotWaktuId,
      );

      if (preference && preference.preferensi === "unavailable") {
        violations.push({
          type: "hard_constraint",
          description: `Guru ID ${item.guruId} assigned to time slot ${item.slotWaktuId} but marked as unavailable`,
          weight: 5.0,
        });
      } else if (preference && preference.preferensi === "preferred") {
        // This is actually good, so we don't add a violation
        // We could add a negative weight to favor this assignment
      }
    }
  }

  // Check guru teaching load
  private checkGuruTeachingLoad(
    chromosome: Chromosome,
    violations: ConstraintViolation[],
  ): void {
    const guruLoad = new Map<number, number>();

    // Count teaching hours for each guru
    for (const item of chromosome) {
      const currentLoad = guruLoad.get(item.guruId) || 0;
      const mataPelajaran = this.mataPelajaran.find(
        (mp) => mp.id === item.mataPelajaranId,
      );
      if (mataPelajaran) {
        guruLoad.set(item.guruId, currentLoad + mataPelajaran.jam_per_minggu);
      }
    }

    // Check if load is within min-max range
    for (const guru of this.guru) {
      const load = guruLoad.get(guru.id) || 0;

      if (load < guru.beban_mengajar_min) {
        violations.push({
          type: "soft_constraint",
          description: `Guru ID ${guru.id} has teaching load ${load} below minimum ${guru.beban_mengajar_min}`,
          weight:
            (0.5 * (guru.beban_mengajar_min - load)) / guru.beban_mengajar_min,
        });
      } else if (load > guru.beban_mengajar_max) {
        violations.push({
          type: "soft_constraint",
          description: `Guru ID ${guru.id} has teaching load ${load} above maximum ${guru.beban_mengajar_max}`,
          weight:
            (0.5 * (load - guru.beban_mengajar_max)) / guru.beban_mengajar_max,
        });
      }
    }
  }

  // Check for gaps in kelas schedule
  private checkKelasScheduleGaps(
    chromosome: Chromosome,
    violations: ConstraintViolation[],
  ): void {
    // Group by kelas and day
    const kelasSchedule = new Map<string, ScheduleItem[]>();

    for (const item of chromosome) {
      const slotWaktu = this.slotWaktu.find((sw) => sw.id === item.slotWaktuId);
      if (!slotWaktu) continue;

      const key = `${item.kelasId}-${slotWaktu.hari}`;
      if (!kelasSchedule.has(key)) {
        kelasSchedule.set(key, []);
      }
      kelasSchedule.get(key)?.push(item);
    }

    // Check for gaps in each kelas's daily schedule
    for (const [key, items] of kelasSchedule.entries()) {
      const [kelasId, day] = key.split("-");

      // Sort by time slot
      const sortedItems = items.sort((a, b) => {
        const slotA = this.slotWaktu.find((sw) => sw.id === a.slotWaktuId);
        const slotB = this.slotWaktu.find((sw) => sw.id === b.slotWaktuId);
        if (!slotA || !slotB) return 0;
        return slotA.jam_mulai.localeCompare(slotB.jam_mulai);
      });

      // Check for gaps
      for (let i = 1; i < sortedItems.length; i++) {
        const prevSlot = this.slotWaktu.find(
          (sw) => sw.id === sortedItems[i - 1].slotWaktuId,
        );
        const currSlot = this.slotWaktu.find(
          (sw) => sw.id === sortedItems[i].slotWaktuId,
        );

        if (prevSlot && currSlot) {
          // Check if there's a gap (non-consecutive slots)
          // This is a simplified check - in reality, you'd need to check actual times
          const prevIndex = this.slotWaktu.findIndex(
            (sw) => sw.id === prevSlot.id,
          );
          const currIndex = this.slotWaktu.findIndex(
            (sw) => sw.id === currSlot.id,
          );

          if (currIndex - prevIndex > 1) {
            // There's at least one slot gap
            violations.push({
              type: "soft_constraint",
              description: `Kelas ID ${kelasId} has a gap in schedule on ${day} between slots ${prevSlot.id} and ${currSlot.id}`,
              weight: 0.2 * (currIndex - prevIndex - 1),
            });
          }
        }
      }
    }
  }

  // Selection: Tournament selection
  private selection(): number {
    const tournamentSize = 3;
    let bestIndex = Math.floor(Math.random() * this.population.length);
    let bestFitness = this.fitnessScores[bestIndex];

    for (let i = 1; i < tournamentSize; i++) {
      const index = Math.floor(Math.random() * this.population.length);
      if (this.fitnessScores[index] > bestFitness) {
        bestIndex = index;
        bestFitness = this.fitnessScores[index];
      }
    }

    return bestIndex;
  }

  // Crossover: Single point crossover
  private crossover(
    parent1: Chromosome,
    parent2: Chromosome,
  ): [Chromosome, Chromosome] {
    if (Math.random() > this.params.crossoverRate) {
      return [parent1, parent2];
    }

    const crossoverPoint = Math.floor(Math.random() * parent1.length);

    const child1 = [
      ...parent1.slice(0, crossoverPoint),
      ...parent2.slice(crossoverPoint),
    ];
    const child2 = [
      ...parent2.slice(0, crossoverPoint),
      ...parent1.slice(crossoverPoint),
    ];

    return [child1, child2];
  }

  // Mutation: Swap mutation
  private mutate(chromosome: Chromosome): Chromosome {
    if (Math.random() > this.params.mutationRate) {
      return chromosome;
    }

    const mutatedChromosome = [...chromosome];

    // Perform a few random swaps
    const numSwaps = Math.max(1, Math.floor(chromosome.length * 0.05)); // Swap about 5% of genes

    for (let i = 0; i < numSwaps; i++) {
      const index1 = Math.floor(Math.random() * mutatedChromosome.length);
      const index2 = Math.floor(Math.random() * mutatedChromosome.length);

      // Swap items
      [mutatedChromosome[index1], mutatedChromosome[index2]] = [
        mutatedChromosome[index2],
        mutatedChromosome[index1],
      ];
    }

    return mutatedChromosome;
  }

  // Evolve the population
  public evolve(): void {
    const newPopulation: Chromosome[] = [];

    // Elitism: Keep the best chromosomes
    const sortedIndices = this.fitnessScores
      .map((score, index) => ({ score, index }))
      .sort((a, b) => b.score - a.score)
      .map((item) => item.index);

    for (let i = 0; i < this.params.elitismCount; i++) {
      newPopulation.push([...this.population[sortedIndices[i]]]);
    }

    // Generate the rest of the population through selection, crossover, and mutation
    while (newPopulation.length < this.params.populationSize) {
      const parent1Index = this.selection();
      const parent2Index = this.selection();

      const [child1, child2] = this.crossover(
        this.population[parent1Index],
        this.population[parent2Index],
      );

      newPopulation.push(this.mutate(child1));

      if (newPopulation.length < this.params.populationSize) {
        newPopulation.push(this.mutate(child2));
      }
    }

    this.population = newPopulation;
    this.evaluatePopulation();
  }

  // Run the genetic algorithm
  public run(): Chromosome {
    this.initializePopulation();

    for (
      let generation = 0;
      generation < this.params.generations;
      generation++
    ) {
      this.evolve();

      // Optional: Log progress
      if (generation % 10 === 0) {
        console.log(
          `Generation ${generation}: Best fitness = ${this.bestFitness}`,
        );
      }
    }

    return this.bestChromosome || this.population[0];
  }

  // Get the best solution found
  public getBestSolution(): { chromosome: Chromosome; fitness: number } {
    return {
      chromosome: this.bestChromosome || this.population[0],
      fitness: this.bestFitness,
    };
  }
}
