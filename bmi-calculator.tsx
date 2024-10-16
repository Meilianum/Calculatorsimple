"use client";
import { useState, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface BmiResult {
  bmi: string;
  category: string;
}

export default function BmiCalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.value);
  };

  const calculateBmi = (): void => {
    if (!height || !weight) {
      setError("Please enter both height and weight.");
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    if (heightInMeters <= 0) {
      setError("Height must be a positive number.");
      return;
    }

    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) {
      setError("Weight must be a positive number.");
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    let category = "";
    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({ bmi: bmiValue.toFixed(1), category });
    setError("");
  };

  return (
    <Card className="bg-slate-400 text-black flex-1 justify-around">
        <img src="https://play-lh.googleusercontent.com/oRfGPvu132cuyKZXG9Z-OoWr-OlN7VFBIw60vvkBQ2Gzv4V4VdtvpwEISJ1rv9ZzTVI" alt="bmi" width="200"></img>
      <CardHeader>
        <CardTitle className="text-center bg-slate-400">BMI Calculator</CardTitle>
        <CardDescription className="text-2xl">Calculate your Body Mass Index</CardDescription>
      </CardHeader>
      <CardContent>
        <Label htmlFor="height tex-2xl">Height (cm)</Label>
        <Input id="height" value={height} onChange={handleHeightChange} />
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input id="weight" value={weight} onChange={handleWeightChange} /><br></br>
        <Button onClick={calculateBmi} className="bg-amber-500 text-black text-2xl">Calculate</Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {result && (
          <div>
            <p>BMI: {result.bmi}</p>
            <p>Category: {result.category}</p>
          </div>
        )}
      </CardContent>
      <h1>presented by Rukhsana Rais</h1>
    </Card>
   
  );
}



