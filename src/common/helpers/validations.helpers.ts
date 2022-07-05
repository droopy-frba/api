export const isValidEmail = (email: string): boolean => {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return email && re.test(email);
};

export const isValidPassword = (password: string): boolean => {
  const complex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!_@#$%^&+=])/;
  const isComplex = complex.test(password);
  const correctLength = password.length >= 8;
  return correctLength && isComplex;
};
