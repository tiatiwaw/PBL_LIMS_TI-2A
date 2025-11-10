import { Beaker, Gauge, Microscope, TestTube, Users, Wrench } from "lucide-react";

export const stats = [
  {
    title: "Total Client",
    value: "40",
    subtitle: "Increased from last month",
    icon: Users,
  },
  {
    title: "Total Peralatan",
    value: "40",
    subtitle: "Increased from last month",
    icon: Wrench,
  },
  {
    title: "Total Reagen",
    value: "40",
    subtitle: "Increased from last month",
    icon: Beaker,
  },
  {
    title: "Total Sampel",
    value: "40",
    subtitle: "Increased from last month",
    icon: TestTube,
  },
  {
    title: "Total Parameter",
    value: "40",
    subtitle: "Increased from last month",
    icon: Gauge,
  },
  {
    title: "Total Metode Uji",
    value: "40",
    subtitle: "Increased from last month",
    icon: Microscope,
  },
];

export const monthlyTrend = [
  { month: 'Jan', client: 25, sampel: 28, pengujian: 30 },
  { month: 'Feb', client: 28, sampel: 32, pengujian: 35 },
  { month: 'Mar', client: 32, sampel: 35, pengujian: 38 },
  { month: 'Apr', client: 35, sampel: 38, pengujian: 40 },
  { month: 'May', client: 38, sampel: 39, pengujian: 42 },
  { month: 'Jun', client: 40, sampel: 40, pengujian: 45 },
];

export const equipmentUsage = [
  { name: 'Peralatan', value: 40, color: '#10b981' },
  { name: 'Reagen', value: 40, color: '#3b82f6' },
  { name: 'Parameter', value: 40, color: '#8b5cf6' },
  { name: 'Metode Uji', value: 40, color: '#f59e0b' },
];

export const recentActivity = [
  { day: 'Sen', tests: 12 },
  { day: 'Sel', tests: 15 },
  { day: 'Rab', tests: 10 },
  { day: 'Kam', tests: 18 },
  { day: 'Jum', tests: 14 },
  { day: 'Sab', tests: 8 },
  { day: 'Min', tests: 5 },
];
