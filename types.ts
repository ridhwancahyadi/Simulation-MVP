export interface FleetItem {
  aircraft_type: string;
  category: string;
  quantity: number;
}

export interface MissionBrief {
  origin: string;
  target_points: string[];
  fleet_available: FleetItem[];
  mission_objective: string;
}

export interface ScoreComponent {
  metric: string;
  weight: number;
  value: number;
}

export interface HardGateSummary {
  hard_gate_overall_status: string;
  mass_check: string;
  cg_check: string;
  runway_check: string;
  climb_check: string;
  oge_check: string;
  fuel_check: string;
  security_check: string;
}

export interface PayloadDist {
  location: string;
  delivered_kg: number;
}

export interface AircraftAllocation {
  aircraft_type: string;
  quantity_used: number;
  route_sequence: string[];
  served_points: string[];
  payload_carried_kg: number;
  payload_distribution?: PayloadDist[];
}

export interface Recommendation {
  name: string;
  detail: string;
  purpose: string;
  summary_global: {
    total_payload_delivered_kg: number;
    total_fuel_burn_kg: number;
    total_mission_time_min: number;
    total_distance_nm: number;
    total_risk_index: number;
    operational_status: string;
    primary_reason: string;
    objective: string;
  };
  executive_summary: {
    supporting_factors: string[];
    attention_factors: string[];
    key_mitigations: string[];
  };
  aircraft_allocation: AircraftAllocation[];
  minimum_margin: {
    minimum_climb_margin_percent: number;
    minimum_runway_margin_percent: number;
    minimum_oge_margin_percent: number;
    minimum_fuel_reserve_margin_percent: number;
    critical_location: string;
    critical_leg: string;
  };
  hard_gate_summary: HardGateSummary;
  score_breakdown: {
    objective_mode: string;
    components: ScoreComponent[];
    final_score: number;
  };
  tactical_layer: {
    hotspot_proximity_km: number;
    summary_risk: string;
    threat_level: string;
  };
  environmental_conditions: {
    temperature_range_c: string;
    max_density_altitude_ft: number;
    avg_wind_kts: number;
    visibility_km: number;
    daylight_window_min: number;
    weather_trend: string;
  };
}

export interface SystemOutput {
  version: string;
  analysis_mode: string;
  generated_at_utc: string;
  objective_mode: string;
  priority_weights: {
    delivery: number;
    safety: number;
    efficiency: number;
  };
  recommendation_limit: number;
}

export interface MissionData {
  system_output: SystemOutput;
  mission_brief: MissionBrief;
  recommendations: Recommendation[];
}