function validateRegistration(login, p1, p2) {
  if (!login || !p1 || !p2) {
    return {
      emptyFieldError: true
    };
  }

  if (p1 !== p2) {
    return {
      passwordEqualError: true
    };
  }
}

module.exports = { validateRegistration };
