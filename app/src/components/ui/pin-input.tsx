import { PinInput as ChakraPinInput, Group } from "@chakra-ui/react"
import * as React from "react"

export interface PinInputProps extends ChakraPinInput.RootProps {
  rootRef?: React.Ref<HTMLDivElement>
  count?: number
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  attached?: boolean
}

export const PinInput = React.forwardRef<HTMLInputElement, PinInputProps>(
  function PinInput(props, ref) {
    const { count = 6, inputProps, rootRef, attached, ...rest } = props
    return (
      <ChakraPinInput.Root ref={rootRef} {...rest}>
        <ChakraPinInput.HiddenInput ref={ref} {...inputProps} />
        <ChakraPinInput.Control>
          <Group display={"flex"} justifyContent={"space-between"} attached={attached}>
            {Array.from({ length: count }).map((_, index) => (
              <ChakraPinInput.Input minW={3} p={["0px", "6px", "12px"]} key={index} index={index} />
            ))}
          </Group>
        </ChakraPinInput.Control>
      </ChakraPinInput.Root>
    )
  },
)
