import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, Image, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import Animated, { 
  FadeIn, 
  Layout,
  Easing
} from 'react-native-reanimated';

export default function SignUpScreen() {
  const router = useRouter();
  const [showEmailSignUp, setShowEmailSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAppleSignUp = () => {
    // In a real app, implement Apple Sign Up
    router.replace('/(tabs)');
  };

  const handleGoogleSignUp = () => {
    // In a real app, implement Google Sign Up
    router.replace('/(tabs)');
  };

  const handleEmailSignUp = () => {
    setShowEmailSignUp(true);
  };

  const handleCloseEmailModal = () => {
    setShowEmailSignUp(false);
    // Reset form
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const validateForm = () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }
    
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    if (!password) {
      Alert.alert('Error', 'Please enter a password');
      return false;
    }
    
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return false;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleEmailSignUpSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      setShowEmailSignUp(false);
      
      // In a real app, this would create the account with your backend
      Alert.alert(
        'Account Created!',
        'Welcome to MindMood! Your account has been created successfully.',
        [
          {
            text: 'Get Started',
            onPress: () => router.replace('/(tabs)')
          }
        ]
      );
    }, 2000);
  };

  const isFormValid = fullName.trim() && email.trim() && password && confirmPassword && password === confirmPassword && !isLoading;

  // Apple logo component
  const AppleLogo = () => (
    <View style={styles.appleLogoContainer}>
      <Image 
        source={{ uri: 'https://i.imgur.com/eyHcHLY.png' }}
        style={styles.appleLogoImage}
        resizeMode="contain"
      />
    </View>
  );

  // Google logo component
  const GoogleLogo = () => (
    <View style={styles.googleLogoContainer}>
      <Image 
        source={{ uri: 'https://i.imgur.com/bunX9Gb.png' }}
        style={styles.googleLogoImage}
        resizeMode="contain"
      />
    </View>
  );

  // Email icon component
  const EmailIcon = () => (
    <View style={styles.emailIconContainer}>
      <Mail size={24} color="#64748b" />
    </View>
  );

  return (
    <LinearGradient colors={['#f8fafc', '#ffffff']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animated.View 
          style={styles.header}
          entering={FadeIn.duration(600).easing(Easing.out(Easing.cubic))}
        >
          <View style={styles.headerContent}>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>
              Welcome to MindMood! Let's set up your account to get started.
            </Text>
          </View>
        </Animated.View>

        {/* Content */}
        <View style={styles.content}>
          {/* Success Message */}
          <Animated.View 
            style={styles.successContainer}
            entering={FadeIn.delay(200).duration(600).easing(Easing.out(Easing.cubic))}
          >
            <View style={styles.successIcon}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <Text style={styles.successTitle}>Payment Successful!</Text>
            <Text style={styles.successMessage}>
              Your subscription is now active. Create your account to start your wellness journey.
            </Text>
          </Animated.View>

          {/* Sign Up Options */}
          <View style={styles.signUpOptions}>
            {/* Apple Sign Up */}
            <Animated.View
              entering={FadeIn.delay(400).duration(600).easing(Easing.out(Easing.cubic))}
              layout={Layout.springify()}
            >
              <TouchableOpacity 
                style={styles.appleSignUpButton}
                onPress={handleAppleSignUp}
                activeOpacity={0.8}
              >
                <AppleLogo />
                <Text style={styles.appleSignUpText}>Sign up with Apple</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Google Sign Up */}
            <Animated.View
              entering={FadeIn.delay(550).duration(600).easing(Easing.out(Easing.cubic))}
              layout={Layout.springify()}
            >
              <TouchableOpacity 
                style={styles.googleSignUpButton}
                onPress={handleGoogleSignUp}
                activeOpacity={0.8}
              >
                <GoogleLogo />
                <Text style={styles.googleSignUpText}>Sign up with Google</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Email Sign Up */}
            <Animated.View
              entering={FadeIn.delay(700).duration(600).easing(Easing.out(Easing.cubic))}
              layout={Layout.springify()}
            >
              <TouchableOpacity 
                style={styles.emailSignUpButton}
                onPress={handleEmailSignUp}
                activeOpacity={0.8}
              >
                <EmailIcon />
                <Text style={styles.emailSignUpText}>Continue with email</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        {/* Footer */}
        <Animated.View 
          style={styles.footer}
          entering={FadeIn.delay(850).duration(600).easing(Easing.out(Easing.cubic))}
        >
          <Text style={styles.termsText}>
            By creating an account, you agree to our{'\n'}
            <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </Animated.View>

        {/* Email Sign Up Modal */}
        <Modal
          visible={showEmailSignUp}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseEmailModal}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <TouchableOpacity 
                    style={styles.backButton}
                    onPress={handleCloseEmailModal}
                  >
                    <ArrowLeft size={20} color="#64748b" />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Create Account</Text>
                  <View style={styles.headerSpacer} />
                </View>

                {/* Email Sign Up Form */}
                <View style={styles.emailForm}>
                  {/* Full Name Input */}
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Full Name"
                      placeholderTextColor="#94a3b8"
                      value={fullName}
                      onChangeText={setFullName}
                      autoCapitalize="words"
                      autoCorrect={false}
                      autoComplete="name"
                    />
                  </View>

                  {/* Email Input */}
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#94a3b8"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="email"
                    />
                  </View>

                  {/* Password Input */}
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[styles.input, styles.passwordInput]}
                      placeholder="Password (min. 8 characters)"
                      placeholderTextColor="#94a3b8"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="new-password"
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color="#64748b" />
                      ) : (
                        <Eye size={20} color="#64748b" />
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Confirm Password Input */}
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[styles.input, styles.passwordInput]}
                      placeholder="Confirm Password"
                      placeholderTextColor="#94a3b8"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="new-password"
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} color="#64748b" />
                      ) : (
                        <Eye size={20} color="#64748b" />
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Create Account Button */}
                  <TouchableOpacity 
                    style={[
                      styles.createAccountButton,
                      { opacity: isFormValid ? 1 : 0.5 }
                    ]}
                    onPress={handleEmailSignUpSubmit}
                    disabled={!isFormValid}
                  >
                    <Text style={styles.createAccountText}>
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Text>
                  </TouchableOpacity>

                  {/* Terms */}
                  <Text style={styles.formTermsText}>
                    By creating an account, you agree to our{'\n'}
                    <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#dcfce7',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 32,
    color: '#16a34a',
    fontFamily: 'Inter-Bold',
  },
  successTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  signUpOptions: {
    gap: 16,
  },
  appleSignUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appleSignUpText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  googleSignUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  googleSignUpText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  emailSignUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  emailSignUpText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  appleLogoContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
  },
  appleLogoImage: {
    width: 40,
    height: 40,
    tintColor: '#ffffff',
  },
  googleLogoContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogoImage: {
    width: 40,
    height: 40,
  },
  emailIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  // Modal styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    maxHeight: '90%',
  },
  modalContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  headerSpacer: {
    width: 28,
  },
  emailForm: {
    gap: 20,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  passwordInput: {
    paddingRight: 60,
  },
  eyeButton: {
    position: 'absolute',
    right: 20,
    top: 18,
    padding: 4,
  },
  createAccountButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  createAccountText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  formTermsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 8,
  },
});