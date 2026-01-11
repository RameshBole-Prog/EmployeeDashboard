// Full Name validation
export const fullNameValidation = (isRequired = true) => {
  const rules = {};
  
  if (isRequired) {
    rules.required = "Full Name is required";
  }
  
  rules.minLength = {
    value: 2,
    message: "Full Name must be at least 2 characters"
  };
  
  rules.pattern = {
    value: /^[A-Za-z\s.,'-]+$/,
    message: "Full Name should contain only letters, spaces, and basic punctuation"
  };
  
  rules.maxLength = {
    value: 100,
    message: "Full Name must not exceed 100 characters"
  };
  
  return rules;
};

// Gender validation
export const genderValidation = (isRequired = true) => {
  const rules = {};
  
  if (isRequired) {
    rules.required = "Gender is required";
  }
  
  rules.validate = (value) => {
    if (!value && !isRequired) return true;
    if (!value) return "Gender is required";
    if (!['male', 'female', 'other'].includes(value)) {
      return "Please select a valid gender option";
    }
    return true;
  };
  
  return rules;
};

// Date of Birth validation
export const dateOfBirthValidation = (isRequired = true) => {
  const rules = {};
  
  if (isRequired) {
    rules.required = "Date of Birth is required";
  }
  
  rules.validate = (value) => {
    if (!value && !isRequired) return true;
    if (!value) return "Date of Birth is required";
    
    const birthDate = new Date(value);
    const today = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 18);
    const maxAgeDate = new Date();
    maxAgeDate.setFullYear(today.getFullYear() - 100);
    
    if (birthDate > today) {
      return "Date of Birth cannot be in the future";
    }
    if (birthDate > minAgeDate) {
      return "Employee must be at least 18 years old";
    }
    if (birthDate < maxAgeDate) {
      return "Date of Birth seems unrealistic";
    }
    
    return true;
  };
  
  return rules;
};

// State validation
export const stateValidation = (isRequired = true) => {
  const rules = {};
  
  if (isRequired) {
    rules.required = "State is required";
  }
  
  return rules;
};

// Status validation
export const statusValidation = (isRequired = true) => {
  const rules = {};
  
  if (isRequired) {
    rules.required = "Status is required";
  }
  
  rules.validate = (value) => {
    if (!value && !isRequired) return true;
    if (!value) return "Status is required";
    if (!['active', 'inactive'].includes(value)) {
      return "Please select a valid status";
    }
    return true;
  };
  
  return rules;
};

// Profile Image validation (for form validation)
export const profileImageValidation = (isRequired = true) => {
  const rules = {};
  
  if (isRequired) {
    rules.required = "Profile Image is required";
  }
  
  return rules;
};

// File validation function (for manual file validation)
export const validateImageFile = (file) => {
  if (!file) {
    return 'Profile Image is required';
  }

  const errors = [];

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    errors.push('Please upload a valid image (JPEG, PNG, GIF, WebP)');
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    errors.push('Image size should be less than 5MB');
  }

  // Validate file name
  const fileName = file.name;
  const invalidChars = /[<>:"/\\|?*]/;
  if (invalidChars.test(fileName)) {
    errors.push('File name contains invalid characters');
  }

  return errors.length > 0 ? errors.join(', ') : null;
};

// Helper functions
export const getMaxDateOfBirth = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date.toISOString().split('T')[0];
};

export const getMinDateOfBirth = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 100);
  return date.toISOString().split('T')[0];
};

// Trim form data function
export const trimFormData = (data) => {
  const trimmedData = {};
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') {
      trimmedData[key] = data[key].trim();
    } else {
      trimmedData[key] = data[key];
    }
  });
  return trimmedData;
};