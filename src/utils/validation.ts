export interface feedbackValues {
  title: string;
  category_id: string;
  description: string;
}

export const feedbackValidation = (values: feedbackValues) => {
  const errors: Record<string, string> = {};

  if (values.title.trim().length < 3) {
    errors.title = "Minimaal 3 karakters";
  } else if (values.title.length > 50) {
    errors.title = "Maximaal 50 karakters";
  }

  if (values.category_id === "") {
    errors.category_id = "Kies een categorie";
  }

  if (values.description.trim().length < 10) {
    errors.description = "Minimaal 10 karakters";
  } else if (values.description.length > 250) {
    errors.description = "Maximaal 250 karakters";
  }

  return errors;
};

export const categoryValidation = (title: string) => {
  const errors: Record<string, string> = {};

  if (title.trim().length < 3) {
    errors.title = "Minimaal 3 karakters";
  } else if (title.length > 50) {
    errors.title = "Maximaal 50 karakters";
  }

  return errors;
};

export const loginValidation = (userName: string, password: string) => {
  const errors: Record<string, string> = {};

  if (userName.length < 1) {
    errors.userName = "Naam kan niet leeg zijn";
  }

  if (password.length < 1) {
    errors.password = "Wachtwoord kan niet leeg zijn";
  }

  return errors;
};
