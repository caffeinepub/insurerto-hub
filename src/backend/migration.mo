import Map "mo:core/Map";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Storage "blob-storage/Storage";

module {
  type Inquiry = {
    serviceType : Text;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type UserProfile = {
    name : Text;
  };

  type SiteSettings = {
    logo : Storage.ExternalBlob;
    phone : Text;
    email : Text;
    address : Text;
    businessName : Text;
  };

  // Old actor type before migration
  type OldActor = {
    inquiries : Map.Map<Text, Inquiry>;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  // New actor type after migration
  type NewActor = {
    inquiries : Map.Map<Text, Inquiry>;
    userProfiles : Map.Map<Principal, UserProfile>;
    siteSettings : ?SiteSettings;
  };

  /// Data migration function run after upgrade
  public func run(old : OldActor) : NewActor {
    {
      old with
      siteSettings = null;
    };
  };
};
