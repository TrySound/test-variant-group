export interface GenerateStubParams {
  jobTitle: string;
  company: string;
  skills: string;
  details: string;
}

export function generateStubText(params: GenerateStubParams): string {
  const { jobTitle, company, skills, details } = params;

  const template = `Dear ${company} team,

I am writing to express my interest in the ${jobTitle} position.

My experience in the realm combined with my skills in ${skills} make me a strong candidate for this role.

${details}

I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.

Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`;

  return template;
}
