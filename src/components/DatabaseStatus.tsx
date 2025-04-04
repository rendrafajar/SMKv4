import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { testConnection } from "@/lib/db";

const DatabaseStatus = () => {
  const [status, setStatus] = useState<"loading" | "connected" | "error">(
    "loading",
  );
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    setStatus("loading");
    try {
      const isConnected = await testConnection();
      setStatus(isConnected ? "connected" : "error");
    } catch (error) {
      console.error("Error checking database connection:", error);
      setStatus("error");
    } finally {
      setLastChecked(new Date());
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Status Database</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={checkConnection}
          disabled={isChecking}
        >
          <RefreshCw
            className={`h-4 w-4 ${isChecking ? "animate-spin" : ""}`}
          />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          {status === "connected" ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <p className="text-sm">Terhubung ke Database</p>
            </>
          ) : status === "error" ? (
            <>
              <XCircle className="h-5 w-5 text-red-500" />
              <p className="text-sm">Gagal terhubung ke Database</p>
            </>
          ) : (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              <p className="text-sm">Memeriksa koneksi...</p>
            </>
          )}
        </div>
        {lastChecked && (
          <p className="text-xs text-muted-foreground mt-2">
            Terakhir diperiksa: {lastChecked.toLocaleTimeString()}
          </p>
        )}
        {status === "error" && (
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full"
            onClick={checkConnection}
            disabled={isChecking}
          >
            Coba Lagi
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseStatus;
