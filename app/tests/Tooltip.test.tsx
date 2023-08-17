import { render, screen } from "@testing-library/react"
import Tooltip from "../components/Tooltip"
import userEvent from "@testing-library/user-event";
import { PRESS_ENTER_MESSAGE } from "../utils/constants"


describe("Tooltip component", ()=>{
    beforeEach(()=>{
        render(<Tooltip message={PRESS_ENTER_MESSAGE} trigger={()=>{
            return <button role="button" aria-label="button">Test</button>
        }}/>)
    })

    it("should't exists a tooltip until the trigger is triggered", ()=>{
        const tooltip = screen.queryByText(PRESS_ENTER_MESSAGE)
        expect(tooltip).toBeNull()
    })

    it("should exists a tooltip when is triggered", async ()=>{
        const triggerButton = screen.getByRole("button", {name:"button"})
        await userEvent.click(triggerButton)
        const tooltip = screen.getByText(PRESS_ENTER_MESSAGE)
        expect(tooltip).toBeInTheDocument()
    })
})