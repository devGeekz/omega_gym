import { useState, useCallback } from "react";
import { X, Plus } from "lucide-react";
import type { MembershipPlan, MembershipFeature } from "../types";
import { BILLING_CYCLES, ACCESS_LEVELS, PLAN_CATEGORIES } from "../types";

interface MembershipFormProps {
  plan?: MembershipPlan;
  onSubmit: (data: Partial<MembershipPlan>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const MembershipForm = ({
  plan,
  onSubmit,
  onCancel,
  isLoading = false,
}: MembershipFormProps) => {
  const [formData, setFormData] = useState<Partial<MembershipPlan>>(
    plan || {
      name: "",
      description: "",
      price: 0,
      billingCycle: "Monthly",
      duration: 0,
      features: [],
      maxMembers: 1,
      accessLevel: "Basic",
      category: "Individual",
      trialDays: 7,
      isPopular: false,
      isActive: true,
      color: "bg-slate-500",
      icon: "💪",
      memberCount: 0,
    }
  );

  const [currentFeature, setCurrentFeature] = useState("");

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
              ? Number(value)
              : value,
      }));
    },
    []
  );

  const addFeature = useCallback(() => {
    if (!currentFeature.trim()) {
      alert("Feature name is required");
      return;
    }

    const newFeature: MembershipFeature = {
      id: Date.now().toString(),
      name: currentFeature,
    };

    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), newFeature],
    }));

    setCurrentFeature("");
  }, [currentFeature]);

  const removeFeature = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((f) => f.id !== id),
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name?.trim()) {
      alert("Plan name is required");
      return;
    }
    if (formData.price === undefined || formData.price < 0) {
      alert("Price must be 0 or greater");
      return;
    }
    if (!formData.features || formData.features.length === 0) {
      alert("At least one feature is required");
      return;
    }
    if (formData.maxMembers === undefined || formData.maxMembers <= 0) {
      alert("Max members must be greater than 0");
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name & Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Plan Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleInputChange}
          placeholder="e.g., Standard"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          placeholder="Plan description..."
          rows={2}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          disabled={isLoading}
        />
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Price ($) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price || 0}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Billing Cycle *
          </label>
          <select
            name="billingCycle"
            value={formData.billingCycle || ""}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          >
            {BILLING_CYCLES.map((cycle) => (
              <option key={cycle} value={cycle}>
                {cycle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Access Level & Category */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Access Level *
          </label>
          <select
            name="accessLevel"
            value={formData.accessLevel || ""}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          >
            {ACCESS_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category *
          </label>
          <select
            name="category"
            value={formData.category || ""}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          >
            {PLAN_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Members & Trial Days */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Max Members *
          </label>
          <input
            type="number"
            name="maxMembers"
            value={formData.maxMembers || 0}
            onChange={handleInputChange}
            min="1"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Trial Days
          </label>
          <input
            type="number"
            name="trialDays"
            value={formData.trialDays || 0}
            onChange={handleInputChange}
            min="0"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Icon & Color */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Icon
          </label>
          <input
            type="text"
            name="icon"
            value={formData.icon || ""}
            onChange={handleInputChange}
            placeholder="Emoji icon"
            maxLength={2}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-center text-xl dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Color Class
          </label>
          <input
            type="text"
            name="color"
            value={formData.color || ""}
            onChange={handleInputChange}
            placeholder="bg-blue-500"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Features Builder */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Features *
        </label>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentFeature}
              onChange={(e) => setCurrentFeature(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addFeature();
                }
              }}
              placeholder="Add feature..."
              className="flex-1 rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={addFeature}
              className="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-blue-600 disabled:opacity-50"
              disabled={isLoading}
            >
              <Plus className="inline h-4 w-4" />
              Add
            </button>
          </div>

          {/* Features List */}
          <div className="mt-3 space-y-1">
            {formData.features && formData.features.length > 0 ? (
              formData.features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center justify-between rounded bg-white p-2 dark:bg-slate-700"
                >
                  <span className="text-xs font-medium">{feature.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(feature.id)}
                    className="text-red-500 hover:text-red-700"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                No features added yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Popular & Active */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPopular"
            name="isPopular"
            checked={formData.isPopular || false}
            onChange={handleInputChange}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600"
            disabled={isLoading}
          />
          <label htmlFor="isPopular" className="text-sm text-slate-700 dark:text-slate-300">
            Mark as Popular
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive || false}
            onChange={handleInputChange}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600"
            disabled={isLoading}
          />
          <label htmlFor="isActive" className="text-sm text-slate-700 dark:text-slate-300">
            Active
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : plan ? "Update Plan" : "Create Plan"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 rounded-lg border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
