REQUISITOS FUNCIONAIS

# MÉDICO

## PACIENTE

- Deve cadastrar um paciente
- Deve atualizar um paciente
- Deve visualizar detalhes de um paciente
- Deve ativar um paciente
- Deve desativar um paciente

## ANAMNESE

- Deve cadastrar uma anamnese
- Deve visualizar detalhes de uma anamnese
- Deve atualizar uma anamnese

## AGENDAMENTO

- Deve cadastrar um agendamento
- Deve visualizar a listagem de agendamentos
- Deve visualizar detalhes de um agendamento
- Deve atualizar o status de um agendamento

## EXAME

- Deve cadastrar exame
- Deve visualizar detalhes de um exame
- Deve atualizar os detalhes de um exame

## CONSULTA

- Deve cadastrar uma consulta
- Deve visualizar uma consulta
- Deve atualizar uma consulta

## ENCAMINHAMENTO

- Deve cadastrar um encaminhamento
- Deve visualizar um encaminhamento
- Deve atualizar um encaminhamento

REGRAS DE NEGÓCIO

# MÉDICO

## PACIENTE

- Somente usuário com perfil "Médico" podem criar novos pacientes
- Ao cadastrar um novo paciente, somente o médico que cadastrou pode ter acesso ao paciente
- Nos detalhes de um paciente, deve ser mostrado a listagem de consultas dele

## ANAMNESE

- Somente usuário com perfil "Médico" podem criar novos pacientes
- Ao criar uma nova anamnese, a mesma deve ser vinculada a um paciente
- A anamnese deve incluir uma descrição detalhada dos sintomas do paciente, histórico médico, histórico familiar, estilo de vida
- A anamnese deve ser atualizável a qualquer momento pelo médico

## AGENDAMENTO

- Ao criar um novo agendamento, o mesmo deve ser vinculado a um paciente
- O agendamento deve ter sua data somente para dias futuros, nunca sendo no mesmo dia nem anteriores
- Caso a data do agendamento seja ultrapassada, deve ser mostrado o status do agendamento como "cancelado"
- Enquanto a data do agendamento não for ultrapassada, deve ser mostrado o status de "em aberto"
- Caso o paciente confirme sua ida a consulta, deve ser mostrado o status de "confirmado"
- Caso tenha sido criado uma consulta para o agendamento, deve ser mostrado o status como "concluído"
- A listagem de agendamentos deve mostrar apenas agendamentos vinculados ao usuário logado
- A ordenação da listagem de agendamentos deve ser organizadas por data e hora em ordem crescente
- O médico deve ser capaz de visualizar uma lista de todos os agendamentos para um dia específico
- O médico deve ser capaz de cancelar um agendamento //e o paciente deve ser notificado do cancelamento//

## CONSULTA

- Somente usuário com perfil "Médico" podem criar novas consultas
- As consultas devem ser criadas a partir de um agendamento, porém não deve ser vinculada a ele
- Ao cadastrar uma nova consulta, a mesma deve ser vinculada a um paciente
- O médico deve ser capaz de visualizar o histórico de consultas de um paciente
- Uma consulta pode ser atualizada a qualquer momento
- Uma consulta não pode ser excluída, apenas cancelada
- Uma consulta cancelada deve manter um registro de seu estado original para fins de histórico
- O médico deve ser capaz de prescrever medicamentos durante uma consulta, e essas prescrições devem ser anexadas à consulta.

## EXAME

 - Somente usuários com perfil "Médico" podem criar novos encaminhamentos
 - O médico deve ser capaz de cadastrar um exame vinculando a uma consulta
 - O exame deve incluir uma descrição detalhada do motivo do exame
 - O exame deve incluir a data e hora em que foi solicitado
 - O médico deve ser capaz de visualizar todos os exames que cadastrou

## ENCAMINHAMENTO
 
 - Somente usuários com perfil "Médico" podem criar novos encaminhamentos
 - O médico deve ser capaz de encaminhar um paciente para um especialista durante uma consulta, e esses encaminhamentos devem ser vinculados à consulta
 - O encaminhamento deve incluir a especialidade médica para a qual o paciente está sendo encaminhado
 - O encaminhamento deve incluir uma descrição detalhada do motivo do encaminhamento
 - O encaminhamento deve incluir a data e hora em que foi criado
 - O encaminhamento deve ser exibido nos detalhes de uma consulta

