import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface SiteSettings {
    logo: ExternalBlob;
    businessName: string;
    email: string;
    address: string;
    phone: string;
}
export interface Inquiry {
    serviceType: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    /**
     * / Admin-only: Retrieve all inquiries
     */
    getAllInquiries(): Promise<Array<Inquiry>>;
    /**
     * / Get the caller's user profile - user-only
     */
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    /**
     * / Public function to get service categories - no authorization needed
     */
    getServiceCategories(): Promise<Array<string>>;
    /**
     * / Public: Get site settings (returns default settings if not set)
     */
    getSiteSettings(): Promise<SiteSettings>;
    /**
     * / Get a specific user's profile - users can only view their own, admins can view any
     */
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    /**
     * / Save the caller's user profile - user-only
     */
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    /**
     * / Admin only: Update site settings (including logo)
     */
    saveSiteSettings(settings: SiteSettings): Promise<void>;
    /**
     * / Submit a new service inquiry - public function, anyone can submit including guests
     */
    submitInquiry(serviceType: string, name: string, phone: string, email: string, message: string): Promise<void>;
}
