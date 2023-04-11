export interface feedbackValues {
  title: string;
  category_id: string;
  description: string;
}

export const feedbackValidation = (values: feedbackValues) => {
  const errors: Record<string, string> = {};

  if (values.title.length < 3) {
    errors.title = "Minimaal 3 karakters";
  }

  if (values.category_id === "") {
    errors.category_id = "Kies een categorie";
  }

  if (values.description.length < 10) {
    errors.description = "Minimaal 10 karakters";
  }

  return errors;
};

export const categoryValidation = (title: string) => {
  const errors: Record<string, string> = {};

  if (title.length < 3) {
    errors.title = "Minimaal 3 karakters";
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
