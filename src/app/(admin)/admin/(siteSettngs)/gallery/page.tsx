"use client";

import { useState, useCallback } from "react";
import {
  PageHeader,
  GalleryStats,
  GalleryFilters,
  GalleryList,
  GalleryModals,
} from "./components";
import { useGallery } from "./hooks/useGallery";
import { GalleryImage, GalleryCategory, GallerySortBy } from "./types";

export default function GalleryPage() {
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | "">("");
  const [sortBy, setSortBy] = useState<GallerySortBy>("Recent");

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Content states for modals
  const [viewingImage, setViewingImage] = useState<GalleryImage | null>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deletingImage, setDeletingImage] = useState<GalleryImage | null>(null);

  // Loading states
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Use gallery hook
  const { filteredImages, isLoading, uploadImage, updateImage, deleteImage } = useGallery({
    searchTerm,
    selectedCategory,
    sortBy,
  });

  // Get all images for stats
  const { images } = useGallery({});

  // Handlers
  const handleCreate = useCallback(() => {
    setIsCreateOpen(true);
  }, []);

  const handleCreateSubmit = async (
    data: Omit<GalleryImage, "id" | "createdAt" | "updatedAt">
  ) => {
    setIsCreating(true);
    try {
      await uploadImage(data);
    } catch {
      console.error("Upload error");
    } finally {
      setIsCreating(false);
    }
  };

  const handleView = useCallback((image: GalleryImage) => {
    setViewingImage(image);
    setIsViewOpen(true);
  }, []);

  const handleEdit = useCallback((image: GalleryImage) => {
    setEditingImage(image);
    setIsEditOpen(true);
  }, []);

  const handleEditSubmit = async (
    data: Omit<GalleryImage, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!editingImage) return;
    setIsEditing(true);
    try {
      await updateImage(editingImage.id, data);
    } catch {
      console.error("Update error");
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = useCallback((image: GalleryImage) => {
    setDeletingImage(image);
    setIsDeleteOpen(true);
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deletingImage) return;
    setIsDeleting(true);
    try {
      await deleteImage(deletingImage.id);
    } catch {
      console.error("Delete error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortBy("Recent");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader onNewClick={handleCreate} />

      {/* Stats */}
      <GalleryStats images={images} />

      {/* Filters */}
      <GalleryFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onClearFilters={handleClearFilters}
      />

      {/* Gallery Grid */}
      <GalleryList
        images={filteredImages}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modals */}
      <GalleryModals
        isCreateOpen={isCreateOpen}
        isViewOpen={isViewOpen}
        isEditOpen={isEditOpen}
        isDeleteOpen={isDeleteOpen}
        onCreateClose={() => setIsCreateOpen(false)}
        onViewClose={() => setIsViewOpen(false)}
        onEditClose={() => setIsEditOpen(false)}
        onDeleteClose={() => setIsDeleteOpen(false)}
        viewingImage={viewingImage}
        editingImage={editingImage}
        deletingImage={deletingImage}
        onCreateSubmit={handleCreateSubmit}
        onEditSubmit={handleEditSubmit}
        onDeleteConfirm={handleDeleteConfirm}
        isCreating={isCreating}
        isEditing={isEditing}
        isDeleting={isDeleting}
      />
    </div>
  );
}

