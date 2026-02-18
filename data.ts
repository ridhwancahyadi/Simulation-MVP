import { MissionData } from './types';

export const MISSION_DATA: MissionData = {
  "system_output": {
    "version": "aerobridge.output.v2.1.3.preflight.multi_asset",
    "analysis_mode": "pre_flight",
    "generated_at_utc": "2026-02-18T06:40:00Z",
    "objective_mode": "Hybrid Delivery-Safety",
    "priority_weights": {
      "delivery": 0.5,
      "safety": 0.3,
      "efficiency": 0.2
    },
    "recommendation_limit": 3
  },
  "mission_brief": {
    "origin": "Timika (WAYY)",
    "target_points": ["Ilaga (WAYL)", "Sinak (WABS)", "Wamena (WAVV)"],
    "fleet_available": [
      { "aircraft_type": "Cessna 208B", "category": "Fixed Wing", "quantity": 1 },
      { "aircraft_type": "H225M Caracal", "category": "Rotary Wing", "quantity": 1 }
    ],
    "mission_objective": "Mission from Timika to three different points prioritizing payload while considering safety and weather conditions."
  },
  "recommendations": [
    {
      "name": "COA-1 Payload Dominant",
      "detail": "Cessna serves Ilaga and Sinak sequentially, Caracal serves Wamena to maximize payload distribution.",
      "purpose": "Maximizes payload delivery with relatively fast mission time and moderate operational risk.",
      "summary_global": {
        "total_payload_delivered_kg": 1420,
        "total_fuel_burn_kg": 620,
        "total_mission_time_min": 108,
        "total_distance_nm": 92,
        "total_risk_index": 0.29,
        "operational_status": "GO",
        "primary_reason": "All hard gates met and safety margins within policy limits.",
        "objective": "Hybrid Delivery-Safety"
      },
      "executive_summary": {
        "supporting_factors": [
          "Relatively short distance for fixed wing.",
          "Sufficient fuel reserves on all legs.",
          "Weather above VFR minimums."
        ],
        "attention_factors": [
          "Ilaga runway margin tight for Cessna.",
          "High density altitude conditions potentially affecting performance."
        ],
        "key_mitigations": [
          "Re-check OAT before takeoff from Ilaga.",
          "Reduce payload if significant temperature rise occurs."
        ]
      },
      "aircraft_allocation": [
        {
          "aircraft_type": "Cessna 208B",
          "quantity_used": 1,
          "route_sequence": ["Timika", "Ilaga", "Sinak"],
          "served_points": ["Ilaga", "Sinak"],
          "payload_carried_kg": 520,
          "payload_distribution": [
            { "location": "Ilaga", "delivered_kg": 260 },
            { "location": "Sinak", "delivered_kg": 260 }
          ]
        },
        {
          "aircraft_type": "H225M Caracal",
          "quantity_used": 1,
          "route_sequence": ["Timika", "Wamena", "Timika"],
          "served_points": ["Wamena"],
          "payload_carried_kg": 900,
          "payload_distribution": [
            { "location": "Wamena", "delivered_kg": 900 }
          ]
        }
      ],
      "minimum_margin": {
        "minimum_climb_margin_percent": 12,
        "minimum_runway_margin_percent": 18,
        "minimum_oge_margin_percent": 16,
        "minimum_fuel_reserve_margin_percent": 20,
        "critical_location": "Ilaga",
        "critical_leg": "Ilaga → Sinak"
      },
      "hard_gate_summary": {
        "hard_gate_overall_status": "PASS",
        "mass_check": "PASS",
        "cg_check": "PASS",
        "runway_check": "PASS",
        "climb_check": "PASS",
        "oge_check": "PASS (rotary only)",
        "fuel_check": "PASS",
        "security_check": "PASS"
      },
      "score_breakdown": {
        "objective_mode": "Hybrid Delivery-Safety",
        "components": [
          { "metric": "delivery", "weight": 0.5, "value": 0.86 },
          { "metric": "safety", "weight": 0.3, "value": 0.72 },
          { "metric": "efficiency", "weight": 0.2, "value": 0.68 }
        ],
        "final_score": 0.79
      },
      "tactical_layer": {
        "hotspot_proximity_km": 9.5,
        "summary_risk": "Moderate risk in Ilaga corridor due to mountainous terrain.",
        "threat_level": "YELLOW"
      },
      "environmental_conditions": {
        "temperature_range_c": "20 - 35",
        "max_density_altitude_ft": 10850,
        "avg_wind_kts": 8,
        "visibility_km": 7,
        "daylight_window_min": 240,
        "weather_trend": "Stable weather with potential afternoon clouds."
      }
    },
    {
      "name": "COA-2 Safety-Buffered Rotary",
      "detail": "Caracal handles Ilaga and Sinak to increase safety margins at high elevation.",
      "purpose": "Maintains greater safety margins at high elevation airports while maintaining high payload volume.",
      "summary_global": {
        "total_payload_delivered_kg": 1500,
        "total_fuel_burn_kg": 780,
        "total_mission_time_min": 132,
        "total_distance_nm": 95,
        "total_risk_index": 0.21,
        "operational_status": "GO",
        "primary_reason": "Rotary wing use increases safety margins at high elevation airports.",
        "objective": "Hybrid Delivery-Safety"
      },
      "executive_summary": {
        "supporting_factors": [
          "OGE and power margins quite stable.",
          "Lower tactical risk compared to fixed wing at Ilaga."
        ],
        "attention_factors": [
          "Higher fuel consumption.",
          "Longer mission duration."
        ],
        "key_mitigations": [
          "Minimize ground time in risk areas.",
          "Monitor real-time weather changes."
        ]
      },
      "aircraft_allocation": [
        {
          "aircraft_type": "H225M Caracal",
          "quantity_used": 1,
          "route_sequence": ["Timika", "Ilaga", "Sinak", "Timika"],
          "served_points": ["Ilaga", "Sinak"],
          "payload_carried_kg": 1100
        },
        {
          "aircraft_type": "Cessna 208B",
          "quantity_used": 1,
          "route_sequence": ["Timika", "Wamena", "Timika"],
          "served_points": ["Wamena"],
          "payload_carried_kg": 400
        }
      ],
      "minimum_margin": {
        "minimum_climb_margin_percent": 14,
        "minimum_runway_margin_percent": 22,
        "minimum_oge_margin_percent": 14,
        "minimum_fuel_reserve_margin_percent": 22,
        "critical_location": "Ilaga",
        "critical_leg": "Ilaga → Sinak"
      },
      "hard_gate_summary": {
        "hard_gate_overall_status": "PASS",
        "mass_check": "PASS",
        "cg_check": "PASS",
        "runway_check": "PASS",
        "climb_check": "PASS",
        "oge_check": "PASS",
        "fuel_check": "PASS",
        "security_check": "PASS"
      },
      "score_breakdown": {
        "objective_mode": "Hybrid Delivery-Safety",
        "components": [
          { "metric": "delivery", "weight": 0.5, "value": 0.90 },
          { "metric": "safety", "weight": 0.3, "value": 0.84 },
          { "metric": "efficiency", "weight": 0.2, "value": 0.55 }
        ],
        "final_score": 0.81
      },
      "tactical_layer": {
        "hotspot_proximity_km": 9.5,
        "summary_risk": "Lower risk than COA-1 as rotary wing is more adaptive at high elevation.",
        "threat_level": "YELLOW"
      },
      "environmental_conditions": {
        "temperature_range_c": "20 - 35",
        "max_density_altitude_ft": 10850,
        "avg_wind_kts": 9,
        "visibility_km": 7,
        "daylight_window_min": 240,
        "weather_trend": "Stable with potential afternoon changes."
      }
    },
    {
      "name": "COA-3 Staged Buffer Strategy",
      "detail": "Staged approach with staging at Wamena for operational flexibility.",
      "purpose": "Reduces risk if weather changes or threat increases.",
      "summary_global": {
        "total_payload_delivered_kg": 1200,
        "total_fuel_burn_kg": 920,
        "total_mission_time_min": 156,
        "total_distance_nm": 128,
        "total_risk_index": 0.18,
        "operational_status": "CONDITIONAL_GO",
        "primary_reason": "High safety margins but low efficiency.",
        "objective": "Hybrid Delivery-Safety"
      },
      "executive_summary": {
        "supporting_factors": [
          "Lowest risk among the three COAs.",
          "Has diversion and holding options."
        ],
        "attention_factors": [
          "High fuel cost.",
          "Longer mission duration."
        ],
        "key_mitigations": [
          "Use only during high volatility.",
          "Establish decision point before proceeding to next leg."
        ]
      },
      "aircraft_allocation": [
        {
          "aircraft_type": "Cessna 208B",
          "quantity_used": 1,
          "route_sequence": ["Timika", "Wamena", "Timika"],
          "served_points": ["Wamena"],
          "payload_carried_kg": 600
        },
        {
          "aircraft_type": "H225M Caracal",
          "quantity_used": 1,
          "route_sequence": ["Timika", "Ilaga", "Timika"],
          "served_points": ["Ilaga"],
          "payload_carried_kg": 600
        }
      ],
      "minimum_margin": {
        "minimum_climb_margin_percent": 12,
        "minimum_runway_margin_percent": 20,
        "minimum_oge_margin_percent": 13,
        "minimum_fuel_reserve_margin_percent": 18,
        "critical_location": "Wamena",
        "critical_leg": "Timika → Wamena"
      },
      "hard_gate_summary": {
        "hard_gate_overall_status": "PASS",
        "mass_check": "PASS",
        "cg_check": "PASS",
        "runway_check": "PASS",
        "climb_check": "PASS",
        "oge_check": "PASS",
        "fuel_check": "PASS",
        "security_check": "PASS"
      },
      "score_breakdown": {
        "objective_mode": "Hybrid Delivery-Safety",
        "components": [
          { "metric": "delivery", "weight": 0.5, "value": 0.74 },
          { "metric": "safety", "weight": 0.3, "value": 0.88 },
          { "metric": "efficiency", "weight": 0.2, "value": 0.40 }
        ],
        "final_score": 0.70
      },
      "tactical_layer": {
        "hotspot_proximity_km": 9.5,
        "summary_risk": "Lowest risk due to operational buffer.",
        "threat_level": "YELLOW"
      },
      "environmental_conditions": {
        "temperature_range_c": "20 - 35",
        "max_density_altitude_ft": 10850,
        "avg_wind_kts": 10,
        "visibility_km": 7,
        "daylight_window_min": 240,
        "weather_trend": "Potential afternoon weather changes."
      }
    }
  ]
};