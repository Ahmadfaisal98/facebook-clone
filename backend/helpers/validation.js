export const validateEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(/^([a-z\d.-]+)@([a-z]{2,12})(\.[a-z]{2,12})?$/);
