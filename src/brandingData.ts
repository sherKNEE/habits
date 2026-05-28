export interface BrandingLogos {
  appLogo: string;
  appTitleLogo: string;
  guildBadge: string;
  shopBanner: string;
  profileHeaderImg: string;
}

export const BASE_BRANDING: BrandingLogos = {
  appLogo: 'https://cdn-icons-png.flaticon.com/512/1183/1183672.png',
  appTitleLogo: '',
  guildBadge: '',
  shopBanner: '',
  profileHeaderImg: ''
};

let parsedBranding: BrandingLogos = { ...BASE_BRANDING };

if (typeof document !== 'undefined') {
  try {
    const el = document.getElementById('html-branding-logos');
    if (el) {
      parsedBranding = {
        appLogo: el.getAttribute('data-app-logo') || BASE_BRANDING.appLogo,
        appTitleLogo: el.getAttribute('data-app-title-logo') || BASE_BRANDING.appTitleLogo,
        guildBadge: el.getAttribute('data-guild-badge') || BASE_BRANDING.guildBadge,
        shopBanner: el.getAttribute('data-shop-banner') || BASE_BRANDING.shopBanner,
        profileHeaderImg: el.getAttribute('data-profile-header-img') || BASE_BRANDING.profileHeaderImg,
      };
    }
  } catch (err) {
    console.error('Error parsing branding from HTML:', err);
  }
}

export const BRANDING = parsedBranding;
