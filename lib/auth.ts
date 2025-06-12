import { supabase } from './supabase';
import { Alert } from 'react-native';

export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  onboarding_complete: boolean;
}

export const createUserProfile = async (userId: string, email: string): Promise<UserProfile | null> => {
  try {
    // First check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected for new users
      console.error('Error checking existing user:', checkError);
      throw checkError;
    }

    if (existingUser) {
      console.log('User already exists in users table');
      return existingUser;
    }

    // Create new user profile
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        id: userId,
        email: email,
        onboarding_complete: false
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating user profile:', insertError);
      throw insertError;
    }

    console.log('User profile created successfully:', newUser);
    return newUser;

  } catch (error) {
    console.error('Failed to create user profile:', error);
    Alert.alert(
      'Profile Creation Error',
      'There was an issue setting up your profile. Please try again or contact support if the problem persists.'
    );
    return null;
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId);

    if (error) {
      console.error('Error updating user profile:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    return false;
  }
};