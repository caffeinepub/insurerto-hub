import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Loader2,
  LogOut,
  Settings,
  Shield,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetAllInquiries,
  useGetSiteSettings,
  useIsAdmin,
  useSaveSiteSettings,
} from "../hooks/useQueries";

function formatDate(ts: bigint) {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const categoryColor: Record<string, string> = {
  Insurance: "bg-blue-100 text-blue-700",
  Loans: "bg-green-100 text-green-700",
  RTO: "bg-purple-100 text-purple-700",
};

function getCategory(serviceType: string) {
  if (
    [
      "Life Insurance",
      "Health Insurance",
      "Vehicle Insurance",
      "Property Insurance",
    ].includes(serviceType)
  )
    return "Insurance";
  if (
    ["Personal Loan", "Home Loan", "Business Loan", "Vehicle Loan"].includes(
      serviceType,
    )
  )
    return "Loans";
  return "RTO";
}

function SettingsTab() {
  const { data: settings, isLoading } = useGetSiteSettings();
  const saveMutation = useSaveSiteSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [logoBlob, setLogoBlob] = useState<ExternalBlob | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (settings) {
      setBusinessName(settings.businessName);
      setPhone(settings.phone);
      setEmail(settings.email);
      setAddress(settings.address);
      const existingUrl = settings.logo.getDirectURL();
      if (existingUrl) {
        setLogoPreview(existingUrl);
        setLogoBlob(settings.logo);
      }
    }
  }, [settings]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
      setUploadProgress(pct),
    );
    setLogoBlob(blob);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      const logo =
        logoBlob ?? settings?.logo ?? ExternalBlob.fromBytes(new Uint8Array());
      await saveMutation.mutateAsync({
        logo,
        businessName,
        phone,
        email,
        address,
      });
      toast.success("Settings saved successfully!");
      setUploadProgress(0);
    } catch {
      toast.error("Failed to save settings. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div
        data-ocid="settings.loading_state"
        className="flex items-center justify-center py-20"
      >
        <Loader2 className="w-8 h-8 animate-spin text-navy" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl" data-ocid="settings.panel">
      <div className="bg-white rounded-xl shadow-card p-8 space-y-6">
        <div>
          <h2 className="font-display text-xl font-bold text-navy mb-1">
            Site Settings
          </h2>
          <p className="text-muted-foreground text-sm">
            Update your brand identity and contact details shown on the public
            portal.
          </p>
        </div>

        {/* Logo */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">
            Logo
          </Label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl border-2 border-dashed border-border bg-[#F3F5F7] flex items-center justify-center overflow-hidden">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <Shield className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                data-ocid="settings.upload_button"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="border-navy text-navy hover:bg-navy hover:text-white"
                data-ocid="settings.logo.button"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <p className="text-xs text-muted-foreground">
                  Uploading... {uploadProgress}%
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                PNG, JPG, SVG recommended
              </p>
            </div>
          </div>
        </div>

        {/* Business Name */}
        <div>
          <Label
            htmlFor="businessName"
            className="text-sm font-medium text-foreground"
          >
            Business Name
          </Label>
          <Input
            id="businessName"
            data-ocid="settings.businessname.input"
            className="mt-1"
            placeholder="e.g. InsureRTO Hub"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div>
          <Label
            htmlFor="settingsPhone"
            className="text-sm font-medium text-foreground"
          >
            Phone
          </Label>
          <Input
            id="settingsPhone"
            data-ocid="settings.phone.input"
            className="mt-1"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <Label
            htmlFor="settingsEmail"
            className="text-sm font-medium text-foreground"
          >
            Email
          </Label>
          <Input
            id="settingsEmail"
            type="email"
            data-ocid="settings.email.input"
            className="mt-1"
            placeholder="info@yourbusiness.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Address */}
        <div>
          <Label
            htmlFor="settingsAddress"
            className="text-sm font-medium text-foreground"
          >
            Address
          </Label>
          <Textarea
            id="settingsAddress"
            data-ocid="settings.address.textarea"
            className="mt-1 resize-none"
            rows={3}
            placeholder="123 MG Road, Bangalore, Karnataka 560001"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <Button
          type="button"
          data-ocid="settings.save.button"
          disabled={saveMutation.isPending}
          onClick={handleSave}
          className="bg-navy text-white hover:bg-navy/90 w-full sm:w-auto"
        >
          {saveMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>

        {saveMutation.isSuccess && (
          <p
            data-ocid="settings.success_state"
            className="text-sm text-green-600 font-medium"
          >
            ✓ Settings saved successfully
          </p>
        )}
        {saveMutation.isError && (
          <p
            data-ocid="settings.error_state"
            className="text-sm text-destructive font-medium"
          >
            Failed to save. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: inquiries, isLoading: inquiriesLoading } = useGetAllInquiries();

  const isLoggedIn = !!identity;

  const goHome = () => {
    window.location.href = "/";
  };

  if (isInitializing || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F5F7]">
        <div
          data-ocid="admin.loading_state"
          className="flex flex-col items-center gap-3"
        >
          <Loader2 className="w-8 h-8 animate-spin text-navy" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F5F7] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-card p-10 max-w-sm w-full text-center"
          data-ocid="admin.login.panel"
        >
          <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-navy mb-2">
            Admin Portal
          </h1>
          <p className="text-muted-foreground text-sm mb-7">
            Sign in to view all inquiries and manage your portal.
          </p>
          <Button
            data-ocid="admin.login.button"
            onClick={login}
            disabled={loginStatus === "logging-in"}
            className="w-full bg-navy text-white hover:bg-navy/90"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <button
            type="button"
            onClick={goHome}
            className="mt-4 text-sm text-muted-foreground hover:text-navy flex items-center gap-1 mx-auto"
            data-ocid="admin.back.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F5F7] px-4">
        <div
          data-ocid="admin.unauthorized.panel"
          className="bg-white rounded-2xl shadow-card p-10 max-w-sm w-full text-center"
        >
          <h2 className="font-display text-xl font-bold text-navy mb-3">
            Access Denied
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            You do not have admin access. Please contact the administrator.
          </p>
          <Button
            data-ocid="admin.logout.button"
            variant="outline"
            onClick={clear}
            className="mr-2"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
          <Button onClick={goHome} className="bg-navy text-white">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F5F7]">
      {/* Header */}
      <header className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-brand flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="font-display font-bold">InsureRTO Hub</div>
            <div className="text-white/60 text-xs">Admin Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goHome}
            className="text-white/70 hover:text-white text-sm flex items-center gap-1"
            data-ocid="admin.home.link"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </button>
          <Button
            data-ocid="admin.logout.button"
            size="sm"
            variant="outline"
            onClick={clear}
            className="border-white/30 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="inquiries" data-ocid="admin.tabs.panel">
          <TabsList
            className="mb-6 bg-white shadow-sm border border-border"
            data-ocid="admin.tabs.toggle"
          >
            <TabsTrigger
              value="inquiries"
              data-ocid="admin.inquiries.tab"
              className="data-[state=active]:bg-navy data-[state=active]:text-white"
            >
              Inquiries
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              data-ocid="admin.settings.tab"
              className="data-[state=active]:bg-navy data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-navy">
                  All Inquiries
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {inquiries?.length ?? 0} total inquiries received
                </p>
              </div>
            </div>

            {inquiriesLoading ? (
              <div
                data-ocid="admin.inquiries.loading_state"
                className="flex items-center justify-center py-20"
              >
                <Loader2 className="w-8 h-8 animate-spin text-navy" />
              </div>
            ) : !inquiries || inquiries.length === 0 ? (
              <div
                data-ocid="admin.inquiries.empty_state"
                className="bg-white rounded-xl shadow-card p-16 text-center"
              >
                <p className="text-muted-foreground">No inquiries yet.</p>
              </div>
            ) : (
              <div
                className="bg-white rounded-xl shadow-card overflow-hidden"
                data-ocid="admin.inquiries.table"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F3F5F7]">
                      <TableHead className="font-semibold text-navy">
                        #
                      </TableHead>
                      <TableHead className="font-semibold text-navy">
                        Name
                      </TableHead>
                      <TableHead className="font-semibold text-navy">
                        Service
                      </TableHead>
                      <TableHead className="font-semibold text-navy">
                        Category
                      </TableHead>
                      <TableHead className="font-semibold text-navy">
                        Phone
                      </TableHead>
                      <TableHead className="font-semibold text-navy">
                        Email
                      </TableHead>
                      <TableHead className="font-semibold text-navy">
                        Message
                      </TableHead>
                      <TableHead className="font-semibold text-navy">
                        Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inq, i) => {
                      const category = getCategory(inq.serviceType);
                      const rowKey = `${inq.name}-${String(inq.timestamp)}-${i}`;
                      return (
                        <TableRow
                          key={rowKey}
                          data-ocid={`admin.inquiries.row.${i + 1}`}
                        >
                          <TableCell className="text-muted-foreground text-sm">
                            {i + 1}
                          </TableCell>
                          <TableCell className="font-medium text-navy">
                            {inq.name}
                          </TableCell>
                          <TableCell className="text-sm">
                            {inq.serviceType}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                                categoryColor[category] ??
                                "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {category}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm">{inq.phone}</TableCell>
                          <TableCell className="text-sm">
                            {inq.email || "—"}
                          </TableCell>
                          <TableCell className="text-sm max-w-[200px] truncate">
                            {inq.message || "—"}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(inq.timestamp)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
