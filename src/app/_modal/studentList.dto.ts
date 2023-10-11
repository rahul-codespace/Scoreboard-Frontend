export class StudentList{
  rank!: number;
  id!: number;
  name!: string;
  stream!: Stream;
  totalAchievedPoints!: number;
  totalPoints!: number;
  percentage!: number;
}


class Stream {
  id!: number;
  name!: string;
  students?: string;
  streamCourses?: string;
  createdAt!: string;
}

export interface StudentInfo {
  id: number;
  name: string;
  courses: Course[];
}

export interface Course {
  id: number;
  name: string;
  assignments: Assignment[];
}

export interface Assignment {
  id: number;
  name: string;
  point: number;
  achievedPoint: number | string;
  percentage: number | string;
  comments: string | null;
}
