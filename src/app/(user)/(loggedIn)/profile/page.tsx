"use client";

import { useState } from "react";
import {
  useProfile,
  useTrainingSessions,
  useClasses,
  usePaymentHistory,
} from "@/hooks/useProfileData";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { FitnessStatsCard } from "@/components/profile/FitnessStatsCard";
import { GoalsCard } from "@/components/profile/GoalsCard";
import { TrainingSessionsCard } from "@/components/profile/TrainingSessionsCard";
import { ClassesCard } from "@/components/profile/ClassesCard";
import { PaymentHistoryCard } from "@/components/profile/PaymentHistoryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileSkeleton } from "@/components/Skeletons";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const profile = useProfile();
  const sessions = useTrainingSessions();
  const classes = useClasses();
  const payments = usePaymentHistory();

  if (profile.loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      {/* Profile Header */}
      <div className="w-full">
        <ProfileHeader
          profile={profile.data.profile}
          membership={profile.data.membership}
          onEditClick={() => setActiveTab("settings")}
        />
      </div>

      {/* Tabs Section */}
      <div className="w-full">
        <Tabs value={activeTab} className="w-full">
          <div className="w-full overflow-x-auto -mx-4 sm:mx-0">
            <TabsList className="inline-flex w-fit gap-2 rounded-lg border border-border/50 p-1 bg-muted/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="w-full space-y-6 mt-6">
            <div className="grid w-full gap-6 md:grid-cols-2">
              <div className="w-full">
                <FitnessStatsCard stats={profile.data.stats} />
              </div>
              <div className="w-full">
                <GoalsCard goals={profile.data.goals} />
              </div>
            </div>

            <div className="w-full">
              <TrainingSessionsCard
                sessions={sessions.sessions}
                onBookClick={() => setActiveTab("training")}
              />
            </div>
            <div className="w-full">
              <ClassesCard
                classes={classes.classes}
                onEnrollClick={() => setActiveTab("classes")}
              />
            </div>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="w-full mt-6">
            <div className="w-full">
              <TrainingSessionsCard sessions={sessions.sessions} />
            </div>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes" className="w-full mt-6">
            <div className="w-full">
              <ClassesCard classes={classes.classes} />
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="w-full mt-6">
            <div className="w-full">
              <PaymentHistoryCard payments={payments.payments} />
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="w-full mt-6">
            <Card className="w-full border-0 shadow-sm">
              <div className="w-full p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4">
                  Edit Profile
                </h2>
                <p className="text-muted-foreground mb-6">
                  Profile editing functionality coming soon...
                </p>
                <Button onClick={() => setActiveTab("overview")}>
                  Back to Overview
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
