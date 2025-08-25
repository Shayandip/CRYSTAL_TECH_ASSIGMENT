export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',

  VENDOR = 'VENDOR',
  STAFF = 'STAFF',

  USER = 'USER',
}

export enum DefaultStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVE = 'DEACTIVE',
  DELETED = 'DELETED',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
}

export enum CompanyStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  SUSPENDED = 'SUSPENDED',
}

export enum ReviewStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

export enum AIType {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum FeedbackStatus {
  YES = 'YES',
  NO = 'NO',
  DELETED = 'DELETED',
}

export enum QnAStatus {
  YES = 'YES',
  NO = 'NO',
  DELETED = 'DELETED',
}

export enum ContactUsStatus {
  PENDING = 'PENDING',
  REPLIED = 'REPLIED',
}

export enum PermissionAction {
  CREATE = 'Create',
  READ = 'Read',
  UPDATE = 'Update',
  DELETE = 'Delete',
}

export enum LogType {
  LOGIN = 'IN',
  LOGOUT = 'OUT',
}

export enum RedirectType {
  PRODUCT = 'PRODUCT',
  VENDOR = 'VENDOR',
}

export enum PageType {
  TNC = 'TERMS & CONDITIONS',
  PRIVACY_POLICY = 'PRIVACY POLICY',
  ENQUIRY_DATA_POLICY = 'ENQUIRY DATA POLICY',
  DATA_POLICY = 'DATA POLICY',
  LISTING_POLICY = 'LISTING POLICY',
  ABOUT_APP = 'ABOUT APP',
}

export enum NotificationType {
  // ALL FOR ADMIN AND STAFF
  NEW_PRODUCT = 'NEW PRODUCT',
  NEW_ACCOUNT = 'NEW ACCOUNT',
  CONTACT_US = 'CONTACT US',
  QNA = 'QNA',
  FEEDBACK = 'FEEDBACK',
  INVOICE = 'INVOICE',
  STAFF = 'STAFF',
  TICKET = 'TICKET',

  // ALL FOR VENDOR
  PRODUCT = 'PRODUCT',
  PRODUCT_VIEW = 'PRODUCT VIEW',
  VENDOR_RATING = 'VENDOR RATING',
  VENDOR_ACCOUNT = 'VENDOR ACCOUNT',
  VENDOR_INVOICE = 'VENDOR INVOICE',
  VENDOR_PAYMENT = 'VENDOR PAYMENT',
  VENDOR_TICKET = 'VENDOR TICKET',

  // ALL FOR USER
  USER_PRODUCT = 'USER PRODUCT',
  USER_ACCOUNT = 'USER ACCOUNT',
  USER_INVOICE = 'USER INVOICE',
  USER_PAYMENT = 'USER PAYMENT',
  USER_TICKET = 'USER TICKET',
  OFFER = 'OFFER',

  // FOR ALL
  LOGIN = 'LOGIN',
}

export enum YNStatus {
  All = 'All',
  YES = 'Yes',
  NO = 'No',
}

export enum Feature {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
}
export enum RatingShortStatus {
  ASC = 'ASC',
  DESC = 'DESC',
  ALL = 'ALL',
}

export enum LoginType {
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

export enum ADType {
  ASC = 'ASC',
  DESC = 'DESC',
  NONE = '',
}

export enum BannerType {
  TOP = 'TOP',
  MIDDLE = 'MIDDLE',
  BOTTOM = 'BOTTOM',
}

export enum ProductFileType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export enum CategoryType {
  NORMAL = 'NORMAL',
  NEW = 'NEW',
  TRENDING = 'TRENDING',
}

export enum LeedStatus {
  NEW = 'NEW',
  OLD = 'OLD'
}

export enum DayList {
  SUNDAY = 'Sunday',
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
}