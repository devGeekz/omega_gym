"use client";

import { useState, useCallback } from "react";
import UserHeader from "./header/UserHeader";
import UserFiltersAndSearch from "./filters/UserFiltersAndSearch";
import UserTable from "./table/UserTable";
import UserActionsModal from "./modals/UserActionsModal";
import { User, UserFilters } from "../types";
import { useUsers } from "../hooks/useUsers";

export default function UserManagementContainer() {
  const [filters, setFilters] = useState<UserFilters>({
    search: "",
    role: "ALL",
    status: "ALL",
    page: 1,
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalAction, setModalAction] = useState<"view" | "edit" | "delete" | "block" | "subscription" | null>(null);

  const { users, isLoading, error, totalUsers, refetch } = useUsers(filters);

  const handleFilterChange = useCallback((newFilters: Partial<UserFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // page: newFilters.search || newFilters.role || newFilters.status ? 1 : prev.page,
    }));
  }, []);

  const handleOpenModal = (user: User, action: "view" | "edit" | "delete" | "block" | "subscription") => {
    setSelectedUser(user);
    setModalAction(action);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalAction(null);
  };

  const handleUserUpdated = () => {
    handleCloseModal();
    refetch();
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="animate-in slide-in-from-top-4 duration-500">
        <UserHeader usersCount={totalUsers} />
      </div>
      <div className="animate-in slide-in-from-top-4 duration-500 delay-100">
        <UserFiltersAndSearch filters={filters} onFiltersChange={handleFilterChange} />
      </div>
      <div className="animate-in slide-in-from-top-4 duration-500 delay-200">
        <UserTable
          users={users}
          isLoading={isLoading}
          error={error}
          onUserAction={handleOpenModal}
          filters={filters}
          onFiltersChange={handleFilterChange}
        />
      </div>
      {selectedUser && modalAction && (
        <UserActionsModal
          user={selectedUser}
          action={modalAction}
          isOpen={!!selectedUser}
          onClose={handleCloseModal}
          onSuccess={handleUserUpdated}
        />
      )}
    </div>
  );
}
