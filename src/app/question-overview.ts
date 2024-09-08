export interface QuestionOverview {
    name: string;
    shortName: string;
    categories: Category[];
    distribution: string;
}
export interface Category {
    name: string;
    url: string;
}

export interface Question {
    id: string;
    text: string;
    imageSrc: string;
    answers: string[];
    correctAnswer: number;
}
