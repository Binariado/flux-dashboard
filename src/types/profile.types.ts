export interface Profile {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  mobile: string | null;
  description: string | null;
  isActive: boolean;
  timezone: string | null;
  profilePicture: string | null;
  dateOfBirth: string | null;
  coverPhoto: string | null;
  postalcode: string | null;
  address: string | null;
  country: string | null;
  city: string | null;
  countryCode: string | null;
  cityCode: string | null;
  color: string | null;
}

export interface ProfileResponse extends Profile {}

export type CreateProfileRequest = Omit<ProfileResponse, 'userId'>;
export type UpdateProfileRequest = Required<CreateProfileRequest>;
