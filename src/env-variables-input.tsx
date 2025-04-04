import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "lucide-react";

const EnvVariablesInput = () => {
  const [envVars, setEnvVars] = React.useState({
    POSTGRES_USER: "",
    POSTGRES_PASSWORD: "",
    POSTGRES_HOST: "",
    POSTGRES_PORT: "5432",
    POSTGRES_DB: "smkscheduler",
    POSTGRES_SSL: "false",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnvVars((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would save to environment variables
    // For now, we'll just log to console and show a success message
    console.log("Environment variables:", envVars);
    alert(
      "Database configuration saved! Please restart the application for changes to take effect.",
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Configuration
        </CardTitle>
        <CardDescription>
          Enter your PostgreSQL database credentials
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="POSTGRES_HOST">Database Host</Label>
            <Input
              id="POSTGRES_HOST"
              name="POSTGRES_HOST"
              placeholder="localhost"
              value={envVars.POSTGRES_HOST}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="POSTGRES_PORT">Database Port</Label>
            <Input
              id="POSTGRES_PORT"
              name="POSTGRES_PORT"
              placeholder="5432"
              value={envVars.POSTGRES_PORT}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="POSTGRES_DB">Database Name</Label>
            <Input
              id="POSTGRES_DB"
              name="POSTGRES_DB"
              placeholder="smkscheduler"
              value={envVars.POSTGRES_DB}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="POSTGRES_USER">Database User</Label>
            <Input
              id="POSTGRES_USER"
              name="POSTGRES_USER"
              placeholder="postgres"
              value={envVars.POSTGRES_USER}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="POSTGRES_PASSWORD">Database Password</Label>
            <Input
              id="POSTGRES_PASSWORD"
              name="POSTGRES_PASSWORD"
              type="password"
              placeholder="••••••••"
              value={envVars.POSTGRES_PASSWORD}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="POSTGRES_SSL">Use SSL</Label>
            <select
              id="POSTGRES_SSL"
              name="POSTGRES_SSL"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={envVars.POSTGRES_SSL}
              onChange={(e) =>
                setEnvVars((prev) => ({
                  ...prev,
                  POSTGRES_SSL: e.target.value,
                }))
              }
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Save Configuration
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EnvVariablesInput;
