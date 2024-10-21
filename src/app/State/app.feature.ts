import { createFeature, createSelector } from "@ngrx/store";
import { quizReducer } from "./app.reducers";

export const quizFeature = createFeature({
    name: 'quiz', 
    reducer: quizReducer, 
});