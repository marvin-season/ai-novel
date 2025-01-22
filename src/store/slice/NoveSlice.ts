import { createSlice } from '@reduxjs/toolkit'

export const novelSlice = createSlice({
  name: 'novel',
  initialState: {
    contentMD: ''
  },
  reducers: {
    updateContentMD: (state, action) => {
      state.contentMD = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateContentMD } = novelSlice.actions

export default novelSlice.reducer