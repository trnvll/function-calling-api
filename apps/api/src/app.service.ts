import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { createOpenAPIChain } from 'langchain/chains'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  async openai(query: string): Promise<any> {
    const chain = await createOpenAPIChain(
      'https://gist.githubusercontent.com/roaldnefs/053e505b2b7a807290908fe9aa3e1f00/raw/0a212622ebfef501163f91e23803552411ed00e4/openapi.yaml',
    )

    try {
      return await chain.run(query)
    } catch (err) {
      console.error(err)
      throw new HttpException(
        'Something went wrong.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
