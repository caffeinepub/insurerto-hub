import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import List "mo:core/List";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  let inquiries = Map.empty<Text, Inquiry>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var siteSettings : ?SiteSettings = null;

  public type Inquiry = {
    serviceType : Text;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  public type SiteSettings = {
    logo : Storage.ExternalBlob;
    phone : Text;
    email : Text;
    address : Text;
    businessName : Text;
  };

  /// Submit a new service inquiry - public function, anyone can submit including guests
  public shared ({ caller }) func submitInquiry(serviceType : Text, name : Text, phone : Text, email : Text, message : Text) : async () {
    let timestamp : Int = Time.now();
    let inquiry : Inquiry = {
      serviceType;
      name;
      phone;
      email;
      message;
      timestamp;
    };
    let inquiryId = timestamp.toText();
    inquiries.add(inquiryId, inquiry);
  };

  /// Admin-only: Retrieve all inquiries
  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries.");
    };
    inquiries.values().toList<Inquiry>().toArray();
  };

  /// Public function to get service categories - no authorization needed
  public query ({ caller }) func getServiceCategories() : async [Text] {
    [
      "Insurance - Life",
      "Insurance - Health",
      "Insurance - Vehicle",
      "Insurance - Property",
      "Loans - Personal",
      "Loans - Home",
      "Loans - Business",
      "Loans - Vehicle",
      "RTO - Vehicle Registration",
      "RTO - RC Transfer",
      "RTO - License Renewal",
      "RTO - NOC",
    ];
  };

  /// Get the caller's user profile - user-only
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  /// Get a specific user's profile - users can only view their own, admins can view any
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  /// Save the caller's user profile - user-only
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  /// Public: Get site settings (returns default settings if not set)
  public query ({ caller }) func getSiteSettings() : async SiteSettings {
    switch (siteSettings) {
      case (null) {
        {
          logo = "";
          phone = "+91 9876543210";
          email = "hello@insurerto.com";
          address = "Pune, Maharashtra, India";
          businessName = "InsureRTO Hub";
        };
      };
      case (?settings) { settings };
    };
  };

  /// Admin only: Update site settings (including logo)
  public shared ({ caller }) func saveSiteSettings(settings : SiteSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update site settings");
    };
    siteSettings := ?settings;
  };
};
