export type TeamGroup = 'leadership' | 'directory';

export type LanguageLabelKey = 'english' | 'arabic' | 'dutch' | 'french';

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  groups: TeamGroup[];
  languageCodes: LanguageLabelKey[];
  translationKey: string;
  photo?: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ahmad-kayal',
    name: 'Ahmad',
    email: 'ahmadkayal123123@gmail.com',
    phone: '+31 20 880 1400',
    groups: ['leadership', 'directory'],
    languageCodes: ['english', 'arabic', 'dutch'],
    translationKey: 'team.members.ahmadKayal'
  },
  {
    id: 'osama-karazi',
    name: 'Samo',
    email: 'osamakarazi123@gmail.com',
    phone: '+31 20 880 1500',
    groups: ['leadership', 'directory'],
    languageCodes: ['english', 'arabic'],
    translationKey: 'team.members.osamaKarazi',
    photo: '/osama.jpeg'
  },
  {
    id: 'rony',
    name: 'Rony',
    email: 'rony@rhinefurat.com',
    phone: '+31 20 880 1600',
    groups: ['leadership', 'directory'],
    languageCodes: ['english', 'arabic', 'french'],
    translationKey: 'team.members.rony',
    photo: '/rony.jpg'
  },
  {
    id: 'angie',
    name: 'Ainge',
    email: 'angie.hr@rhinefurat.com',
    phone: '+31 20 880 1700',
    groups: ['leadership', 'directory'],
    languageCodes: ['english', 'arabic', 'dutch'],
    translationKey: 'team.members.angie',
    photo: '/angie.jpg'
  },
 
 
];

export const leadershipMembers = TEAM_MEMBERS.filter((member) =>
  member.groups.includes('leadership')
);

export const directoryMembers = TEAM_MEMBERS.filter((member) =>
  member.groups.includes('directory')
);

export default TEAM_MEMBERS;
