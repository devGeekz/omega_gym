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
import type { SuccessStory } from "../types";
import { SUCCESS_CATEGORIES, STORY_STATUSES } from "../types";

interface StoryFormProps {
  initialData?: SuccessStory;
  onSubmit: (
    data: Omit<SuccessStory, "id" | "createdAt" | "updatedAt">
  ) => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

export const StoryForm = ({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}: StoryFormProps) => {
  const [formData, setFormData] = useState({
    memberName: initialData?.memberName || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: (initialData?.category || "General") as any,
    transformationDetails: initialData?.transformationDetails || "",
    duration: initialData?.duration || "",
    testimonial: initialData?.testimonial || "",
    featured: initialData?.featured || false,
    status: (initialData?.status || "Draft") as any,
    weightBefore: initialData?.weight?.before || 0,
    weightAfter: initialData?.weight?.after || 0,
  });

  const handleChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.memberName.trim() || !formData.title.trim()) {
      toast.error("Member name and title are required");
      return;
    }

    if (
      !formData.description.trim() ||
      !formData.transformationDetails.trim()
    ) {
      toast.error("Description and transformation details are required");
      return;
    }

    const data: Omit<SuccessStory, "id" | "createdAt" | "updatedAt"> = {
      memberName: formData.memberName,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      transformationDetails: formData.transformationDetails,
      duration: formData.duration,
      testimonial: formData.testimonial,
      featured: formData.featured,
      status: formData.status,
      weight:
        formData.weightBefore && formData.weightAfter
          ? {
              before: parseFloat(formData.weightBefore.toString()),
              after: parseFloat(formData.weightAfter.toString()),
            }
          : undefined,
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="memberName">Member Name *</Label>
          <Input
            id="memberName"
            value={formData.memberName}
            onChange={(e) => handleChange("memberName", e.target.value)}
            placeholder="e.g., Sarah Johnson"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Story Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g., From Couch to Confident"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Brief summary of the success story"
          className="h-20"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(v) => handleChange("category", v)}
          >
            <SelectTrigger id="category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SUCCESS_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
              {STORY_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="transformationDetails">Transformation Details *</Label>
        <Textarea
          id="transformationDetails"
          value={formData.transformationDetails}
          onChange={(e) =>
            handleChange("transformationDetails", e.target.value)
          }
          placeholder="Detailed description of the transformation process"
          className="h-24"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration *</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            placeholder="e.g., 6 months"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weightBefore">Weight Before (lbs)</Label>
          <Input
            id="weightBefore"
            type="number"
            value={formData.weightBefore}
            onChange={(e) =>
              handleChange("weightBefore", parseFloat(e.target.value) || 0)
            }
            placeholder="Starting weight"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weightAfter">Weight After (lbs)</Label>
          <Input
            id="weightAfter"
            type="number"
            value={formData.weightAfter}
            onChange={(e) =>
              handleChange("weightAfter", parseFloat(e.target.value) || 0)
            }
            placeholder="Final weight"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="testimonial">Member Testimonial *</Label>
        <Textarea
          id="testimonial"
          value={formData.testimonial}
          onChange={(e) => handleChange("testimonial", e.target.value)}
          placeholder="Quote or testimonial from the member"
          className="h-20"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => handleChange("featured", checked)}
        />
        <Label htmlFor="featured" className="cursor-pointer font-normal">
          Feature this story on the website
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
          {isEdit ? "Update Story" : "Create Story"}
        </Button>
      </div>
    </form>
  );
};
