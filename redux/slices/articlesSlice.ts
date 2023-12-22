import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Article } from "@/types/types";

import { RootState } from "@/redux/store";

const articles: Article[] = [];

export const ArticlesSlice: Slice<Article[]> = createSlice({
  name: "articles",
  initialState: articles,
  reducers: {
    initializeArticles: (state, action: PayloadAction<Article[]>) => {
      return action.payload;
    },
  },
});

export const { initializeArticles } = ArticlesSlice.actions;
export const selectArticles = (state: RootState) => state.articles;
export default ArticlesSlice.reducer;
