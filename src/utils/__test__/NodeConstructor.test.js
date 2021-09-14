import Node from "../NodeConstructor";

it('forms new node with default properties', () => {
  const newNode = new Node()

  expect(newNode).toHaveProperty('data')
  expect(newNode).toHaveProperty('next')
})