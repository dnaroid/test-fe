import {act, fireEvent, render, screen, waitFor} from "@testing-library/react"
import "@testing-library/jest-dom"
import Api from "@/config/api"
import {useRouter} from "next/navigation"
import ReviewForm from "@/components/review-form"

jest.mock("../config/api")
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("ReviewForm", () => {
  const mockBackLink = "/"
  const mockReview = {
    id: 1,
    author: "John Doe",
    title: "Great review",
    content: "This is a great review content.",
    rating: "5",
  }

  const mockRouter = {
    replace: jest.fn(),
  }

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter)
  })

  it("should render form with default values", () => {
    render(<ReviewForm data={mockReview} backLink={mockBackLink}/>)

    expect(screen.getByLabelText("Author")).toHaveValue(mockReview.author)
    expect(screen.getByLabelText("Title")).toHaveValue(mockReview.title)
    expect(screen.getByLabelText("Content")).toHaveValue(mockReview.content)
    expect(screen.getByLabelText("Rating:")).toHaveValue(mockReview.rating)
  })

  it("should call onSave and navigate on form submit", async () => {
    Api.updateReview = jest.fn().mockResolvedValue(mockReview)

    render(<ReviewForm data={mockReview} backLink={mockBackLink}/>)

    const saveButton = screen.getByText("SAVE")
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(Api.updateReview).toHaveBeenCalledWith(mockReview.id, mockReview)
      expect(mockRouter.replace).toHaveBeenCalledWith(mockBackLink)
    })
  })

  it("should show spinner while saving", async () => {
    Api.updateReview = jest.fn().mockResolvedValue(mockReview)

    render(<ReviewForm data={mockReview} backLink={mockBackLink}/>)

    const saveButton = screen.getByText("SAVE")
    await act(async () => {
      fireEvent.click(saveButton)
    })

    expect(screen.getByTestId("spinner")).toBeInTheDocument()
  })

  it("should show delete dialog when DELETE button is clicked", () => {
    render(<ReviewForm data={mockReview} backLink={mockBackLink}/>)

    const deleteButton = screen.getByText("DELETE")
    fireEvent.click(deleteButton)

    expect(screen.getByText("Are you sure you want to delete this review?")).toBeInTheDocument()
  })

  it("should call onDelete and navigate when YES button is clicked in delete dialog", async () => {
    Api.deleteReview = jest.fn().mockResolvedValue({})

    render(<ReviewForm data={mockReview} backLink={mockBackLink}/>)

    const deleteButton = screen.getByText("DELETE")
    fireEvent.click(deleteButton)

    const yesButton = screen.getByText("YES")
    fireEvent.click(yesButton)

    await waitFor(() => {
      expect(Api.deleteReview).toHaveBeenCalledWith(mockReview.id)
      expect(mockRouter.replace).toHaveBeenCalledWith(mockBackLink)
    })
  })

  it("should show validation errors for empty fields", async () => {
    render(<ReviewForm data={{}} backLink={mockBackLink}/>)

    const saveButton = screen.getByText("SAVE")

    await act(async () => {
      fireEvent.click(saveButton)
    })
    expect(screen.getByText("Author name should be 2...50 characters")).toBeInTheDocument()
    expect(screen.getByText("Title should be 2...100 characters")).toBeInTheDocument()
    expect(screen.getByText("Content should be 10...1000 characters")).toBeInTheDocument()
  })

  it("should show validation errors for invalid input", async () => {
    render(<ReviewForm data={{}} backLink={mockBackLink}/>)

    const authorInput = screen.getByLabelText("Author")
    const titleInput = screen.getByLabelText("Title")
    const contentInput = screen.getByLabelText("Content")
    const saveButton = screen.getByText("SAVE")

    fireEvent.change(authorInput, {target: {value: "A"}})
    fireEvent.change(titleInput, {target: {value: "T"}})
    fireEvent.change(contentInput, {target: {value: "C"}})

    await act(async () => {
      fireEvent.click(saveButton)
    })

    expect(screen.getByText("Author name should be 2...50 characters")).toBeInTheDocument()
    expect(screen.getByText("Title should be 2...100 characters")).toBeInTheDocument()
    expect(screen.getByText("Content should be 10...1000 characters")).toBeInTheDocument()
  })

  it("should not show validation errors for valid input", async () => {
    render(<ReviewForm data={{}} backLink={mockBackLink}/>)

    const authorInput = screen.getByLabelText("Author")
    const titleInput = screen.getByLabelText("Title")
    const contentInput = screen.getByLabelText("Content")
    const saveButton = screen.getByText("SAVE")

    fireEvent.change(authorInput, {target: {value: "John Doe"}})
    fireEvent.change(titleInput, {target: {value: "All ok"}})
    fireEvent.change(contentInput, {target: {value: "This is a great review content."}})

    await act(async () => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText("Author name should be 2...50 characters")).not.toBeInTheDocument()
      expect(screen.queryByText("Title should be 2...100 characters")).not.toBeInTheDocument()
      expect(screen.queryByText("Content should be 10...1000 characters")).not.toBeInTheDocument()
    })
  })
})
