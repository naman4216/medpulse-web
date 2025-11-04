// File: components/ui/StatCard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-slate-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}