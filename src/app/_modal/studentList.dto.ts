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
