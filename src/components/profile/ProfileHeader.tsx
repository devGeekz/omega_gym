import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MembershipStatus, UserProfileInfo } from "@/types/profile";
import { Edit2, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { getMembershipMonths } from "@/lib/utils";

interface ProfileHeaderProps {
  profile: UserProfileInfo | null;
  membership: MembershipStatus | null;
  onEditClick: () => void;
}

export function ProfileHeader({
  profile,
  membership,
  onEditClick,
}: ProfileHeaderProps) {
  if (!profile) return null;

  // Calculate membership months based on join date
  const membershipMonths = getMembershipMonths(profile.createdAt);

  const membershipColorMap = {
    basic: "bg-blue-100 text-blue-800",
    pro: "bg-purple-100 text-purple-800",
    elite: "bg-amber-100 text-amber-800",
  };

  const statusColorMap = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    expired: "bg-red-100 text-red-800",
    paused: "bg-yellow-100 text-yellow-800",
  };

  // console.log(profile);

  return (
    <Card className="w-full overflow-hidden border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Gradient background */}
      <div className="h-32 w-full bg-linear-to-r from-primary/20 to-primary/10 relative">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="w-full px-4 sm:px-6 pb-6">
        {/* Profile Content */}
        <div className="flex flex-col items-center sm:items-end gap-4 sm:gap-6 -mt-16 mb-6 relative z-10">
          {/* Avatar */}
          <div className="relative flex flex-col items-center w-full sm:w-auto">
            <Image
              src={
                profile.image ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                  profile.name
              }
              alt={profile.name}
              width={120}
              unoptimized
              height={120}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div
              className={`absolute bottom-2 right-4 sm:bottom-0 sm:right-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white ${
                membership?.status === "active" ? "bg-green-500" : "bg-gray-500"
              }`}
            />
          </div>

          {/* Info */}
          <div className="flex-1 w-full sm:text-right">
            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-end gap-3 sm:gap-4">
              <div className="text-center sm:text-right">
                <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent line-clamp-2">
                  {profile.name}
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                  Member for {membershipMonths} months
                </p>
                {profile.bio && (
                  <p className="text-foreground/70 mt-2 text-xs sm:text-sm line-clamp-2">
                    {profile.bio}
                  </p>
                )}
              </div>
              <Button
                onClick={onEditClick}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto whitespace-nowrap"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mt-4 flex-wrap justify-center sm:justify-end">
              {membership && (
                <>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      membershipColorMap[membership.planType]
                    }`}
                  >
                    {membership.planName}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      statusColorMap[membership.status]
                    }`}
                  >
                    {membership.status.charAt(0).toUpperCase() +
                      membership.status.slice(1)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary" />
            <div className="text-sm">
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-primary" />
            <div className="text-sm">
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">
                {profile.phone || "+1 (555) 123-4567"}
              </p>
            </div>
          </div>

          {profile.address && (
            <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
              <MapPin className="w-4 h-4 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium">
                  {profile.address.city}, {profile.address.state}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Membership Details */}
        {membership && (
          <div className="w-full p-3 sm:p-4 bg-muted/50 rounded-lg border border-border/50">
            <div className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Plan Type</p>
                <p className="text-sm font-semibold">{membership.planType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Billing Cycle
                </p>
                <p className="text-sm font-semibold">
                  {membership.billingCycle}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <p className="text-sm font-semibold text-primary">
                  ${membership.price.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Auto Renew</p>
                <p className="text-sm font-semibold">
                  {membership.autoRenew ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
