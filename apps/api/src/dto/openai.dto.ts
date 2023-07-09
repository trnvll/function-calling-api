import { IsNotEmpty } from 'class-validator'

class OpenAIDto {
  @IsNotEmpty()
  readonly query!: string
}

export { OpenAIDto }
