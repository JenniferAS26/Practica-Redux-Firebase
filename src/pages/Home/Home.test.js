import { render } from "@testing-library/react";
import Home from "./index"

describe("Testing Home", () => {
  it("Renderiza correctamente", () => {
    const { getByTest } = render(<Home />)
    const textElement = getByTest("CRUD Productos")
    expect(textElement).toBeInTheDocumment()
  })
})