/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import type { Trainer } from "../types";
import { TRAINER_SPECIALIZATIONS, TRAINER_STATUSES } from "../types";

interface TrainerFormProps {
  initialData?: Trainer;
  onSubmit: (data: Omit<Trainer, "id" | "createdAt" | "updatedAt">) => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

export const TrainerForm = ({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}: TrainerFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    specialization: (initialData?.specialization || "Personal Training") as any,
    bio: initialData?.bio || "",
    certifications: initialData?.certifications?.join(", ") || "",
    experience: initialData?.experience || 0,
    hourlyRate: initialData?.hourlyRate || 0,
    isActive: initialData?.isActive ?? true,
    status: (initialData?.status || "Available") as any,
  });

  const handleChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    if (!formData.bio.trim()) {
      toast.error("Bio is required");
      return;
    }

    if (formData.experience < 0) {
      toast.error("Experience cannot be negative");
      return;
    }

    if (formData.hourlyRate <= 0) {
      toast.error("Hourly rate must be greater than 0");
      return;
    }

    const data: Omit<Trainer, "id" | "createdAt" | "updatedAt"> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      specialization: formData.specialization,
      bio: formData.bio,
      certifications: formData.certifications
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c),
      experience: parseInt(formData.experience.toString()),
      hourlyRate: parseFloat(formData.hourlyRate.toString()),
      isActive: formData.isActive,
      status: formData.status,
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g., John Smith"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="trainer@example.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1-555-0000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization *</Label>
          <Select
            value={formData.specialization}
            onValueChange={(v) => handleChange("specialization", v)}
          >
            <SelectTrigger id="specialization">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TRAINER_SPECIALIZATIONS.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio *</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          placeholder="Tell us about this trainer's experience and approach"
          className="h-20"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience *</Label>
          <Input
            id="experience"
            type="number"
            min="0"
            value={formData.experience}
            onChange={(e) =>
              handleChange("experience", parseInt(e.target.value) || 0)
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hourlyRate">Hourly Rate ($) *</Label>
          <Input
            id="hourlyRate"
            type="number"
            min="0"
            step="0.01"
            value={formData.hourlyRate}
            onChange={(e) =>
              handleChange("hourlyRate", parseFloat(e.target.value) || 0)
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={formData.status}
            onValueChange={(v) => handleChange("status", v)}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TRAINER_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="certifications">Certifications (comma-separated)</Label>
        <Input
          id="certifications"
          value={formData.certifications}
          onChange={(e) => handleChange("certifications", e.target.value)}
          placeholder="e.g., NASM-CPT, ACE, ISSA"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => handleChange("isActive", checked)}
        />
        <Label htmlFor="isActive" className="cursor-pointer font-normal">
          Trainer is active
        </Label>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          {isEdit ? "Update Trainer" : "Add Trainer"}
        </Button>
      </div>
    </form>
  );
};
