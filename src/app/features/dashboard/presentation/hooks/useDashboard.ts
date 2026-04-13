import { useEffect, useMemo, useState } from "react";
import type { EmergencyAlert } from "../../../emergency/domain/Emergency";
import { authService, emergencyService } from "../../../../core/config/services";

export function useDashboard() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    emergencyService
      .listRecentEmergencies()
      .then((items) => {
        if (isMounted) setAlerts(items);
      })
      .catch((err: unknown) => {
        if (isMounted) setError(err instanceof Error ? err.message : "Falha ao carregar alertas.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    const unsubscribe = emergencyService.subscribeToEmergencies((incomingAlert) => {
      setAlerts((current) => [incomingAlert, ...current].slice(0, 20));
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const totalOpenAlerts = useMemo(() => alerts.filter((item) => item.status === "open").length, [alerts]);

  const triggerSOS = async () => {
    const user = await authService.getCurrentUser();
    if (!user) {
      throw new Error("Usuária não autenticada.");
    }

    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10_000,
      });
    });

    await emergencyService.createSOS({
      userId: user.id,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  return { alerts, loading, error, totalOpenAlerts, triggerSOS };
}
