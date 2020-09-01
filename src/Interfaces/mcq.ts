import { IQuestion } from './iquestion';
import { Choices } from './choices';

export interface MCQ
 {    
   QuestionID :number;
   Question:IQuestion ;
   Choices :Choices[];
}
