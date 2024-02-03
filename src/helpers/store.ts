export type TCard = {
  title: string;
  description: string;
  date: string;
};

export type TColumn = {
  label: string;
  cards: TCard[];
};

export const initialData: TColumn[] = [
  {
    label: 'ToDo',
    cards: [
      {
        title: 'First Card',
        description: 'This is the first card description',
        date: "Feb 03, 2024, 01:40:06 AM"
      },
      {
        title: 'Second Card',
        description: 'This is the second card description',
        date: "Feb 03, 2024, 01:40:06 AM"
      }
    ]
  },
  {
    label: 'In Progress',
    cards: [
      {
        title: 'Third Card',
        description: 'This is the third card description',
        date: "Feb 03, 2024, 01:40:06 AM"
      },
      {
        title: 'Fourth Card',
        description: 'This is the fourth card description',
        date: "Feb 03, 2024, 01:40:06 AM"
      }
    ]
  }
];

class Store {
  private dataKey: string = 'data';

  get data(): TColumn[] {
    const dataString = localStorage.getItem(this.dataKey);
    try {
      return JSON.parse(dataString ?? '[]');
    } catch (error) {
      console.error('Error parsing data from local storage:', error);
      return [];
    }
  }

  set data(data: TColumn[]) {
    localStorage.setItem(this.dataKey, JSON.stringify(data));
  }
}

const store = new Store();
export default store;