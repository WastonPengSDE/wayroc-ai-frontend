import { generateService } from '@umijs/openapi';

generateService({
  schemaPath: 'http://localhost:8080/v3/api-docs',
  serversPath: 'src/services/wayroc',
  requestLibPath: "import { request } from '@umijs/max'",
});