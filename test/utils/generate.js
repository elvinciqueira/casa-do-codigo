import faker from 'faker'

const getUsername = faker.internet.userName
const getId = faker.random.uuid
const getEmail = faker.internet.email
const getDescription = faker.lorem.paragraph

function buildUser({...overrides} = {}) {
  return {
    name: getUsername(),
    email: getEmail(),
    description: getDescription(),
    ...overrides
  }
}

function buildCategory({...overrides} = {}) {
  return {
    name: faker.lorem.words(),
    ...overrides
  }
}

function buildCountry({...overrides} = {}) {
  return {
    name: faker.lorem.words(),
    ...overrides
  }
}

function buildState({...overrides} = {}) {
  return {
    name: faker.lorem.words(),
    country_id: getId(),
    ...overrides
  }
}

function buildBook(overrides) {
  return {
    id: getId(),
    category_id: getId(),
    user_id: getId(),
    title: faker.lorem.words(),
    summary: faker.lorem.paragraph(),
    brief: faker.lorem.paragraph(),
    pages: faker.random.number(400),
    price: faker.random.number(100),
    date_publication: faker.time.recent(),
    isbn: faker.lorem.words(),
    ...overrides,
  }
}

function buildOrder({...overrides} = {}) {
  return {
    book_id: getId(),
    discount_id: getId(),
    itens: [
      {
        idBook: getId(),
        quantity: faker.random.number(10)
      }
    ],
    ...overrides
  }
}

function buildDiscount({...overrides} = {}) {
  return {
    discount_id: getId(),
    percentage: faker.random.number(100),
    expiration: faker.date.future(),
    ...overrides
  }
}

function buildReq({...overrides} = {}) {
  const req = {body: {}, params: {}, ...overrides}
  return req
}

function buildRes(overrides = {}) {
  const res = {
    json: jest.fn(() => res).mockName('json'),
    status: jest.fn(() => res).mockName('status'),
    ...overrides,
  }
  return res
}

function buildNext(impl) {
  return jest.fn(impl).mockName('next')
}

export {
  buildBook,
  buildRes,
  buildReq,
  buildNext,
  buildUser,
  buildCategory,
  buildCountry,
  buildState,
  buildOrder,
  buildDiscount,
}