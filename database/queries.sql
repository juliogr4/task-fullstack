CREATE DATABASE task_db
GO

USE task_db;
GO

-- ===== TABLE =====
CREATE TABLE tb_task (
	id INT IDENTITY(1,1) PRIMARY KEY,
	name VARCHAR(MAX) NOT NULL,
	status VARCHAR(250) NOT NULL,		-- active | inactive
	created_at DATETIME DEFAULT GETDATE()
)
GO

-- ===== PROCEDURES =====
CREATE PROCEDURE pr_task_create
	@name VARCHAR(MAX)
AS
INSERT INTO tb_task (name, status)
VALUES 
	(@name, 'active')
GO

CREATE PROCEDURE pr_task_delete
	@id INT
AS
	DELETE FROM tb_task
	WHERE
		id = @id
GO

CREATE PROCEDURE pr_task_edit_status
	@id INT
AS

BEGIN
	DECLARE @status VARCHAR(250) = (SELECT status FROM tb_task WHERE id = @id);

	UPDATE T
		SET status = (CASE WHEN @status = 'active' THEN 'inactive' ELSE 'active' END)
	FROM 
		tb_task T
	WHERE id = @id
END
GO

CREATE PROCEDURE pr_task_get_by_id
	@id INT
AS
	SELECT * FROM tb_task
	WHERE
		id = @id
GO

CREATE PROCEDURE pr_task_get
	@skip_rows INT = 0,
	@page_size INT = 5,
	@search_text VARCHAR(250) = NULL,
	@status VARCHAR(250) = NULL,
	@sort_order VARCHAR(250) = 'ascending'
AS

IF(@sort_order = 'ascending')
BEGIN
	SELECT * FROM tb_task
	WHERE
		(@search_text IS NULL OR name LIKE '%' + @search_text + '%') AND
		(
			(@status = 'active' AND status = 'active') OR
			(@status = 'inactive' AND status = 'inactive') OR
			@status IS NULL
		)
	ORDER BY created_at ASC
	OFFSET @skip_rows ROWS					-- skip x amount of rows
	FETCH NEXT @page_size ROWS ONLY			-- the skipped amount plus the page size

END
ELSE IF (@sort_order = 'descending')
BEGIN
	SELECT * FROM tb_task
	WHERE
		(@search_text IS NULL OR name LIKE '%' + @search_text + '%') AND
		(
			(@status = 'active' AND status = 'active') OR
			(@status = 'inactive' AND status = 'inactive') OR
			@status IS NULL
		)
	ORDER BY created_at DESC						-- order by id or created_at
	OFFSET @skip_rows ROWS					-- skip x amount of rows
	FETCH NEXT @page_size ROWS ONLY			-- the skipped amount plus the page size
END
GO

CREATE PROCEDURE pr_task_get_total_records
	@search_text VARCHAR(250) = NULL,
	@status VARCHAR(250) = 'active'
AS

BEGIN
	SELECT COUNT(*) FROM tb_task
	WHERE
		(@search_text IS NULL OR name LIKE '%' + @search_text + '%') AND
		(
			(@status = 'active' AND status = 'active') OR
			(@status = 'inactive' AND status = 'inactive') OR
			@status IS NULL
		)
END
GO

CREATE PROCEDURE pr_task_edit
	@id INT,
	@name VARCHAR(MAX)
AS
UPDATE T
SET
	name = @name
FROM
	tb_task T
WHERE
	id = @id
GO

---- Populate Data
EXEC pr_task_create @name = 'Rever o relatório mensal'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Agendar reunião com equipe de desenvolvimento'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Atualizar documentação do projeto'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Realizar teste de desempenho no servidor'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Revisar código-fonte'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Preparar apresentação para o cliente'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Conduzir treinamento para novos funcionários'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Resolver bug crítico no sistema'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Fazer backup dos dados'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Atualizar plugins do sistema'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Enviar relatório de progresso para o cliente'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Criar plano de contingência para incidentes'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Revisar políticas de segurança da empresa'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Realizar manutenção preventiva nos servidores'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Analisar métricas de desempenho do sistema'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Agendar reunião de avaliação de equipe'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Desenvolver novo recurso para o aplicativo'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Avaliar propostas de fornecedores'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Revisar contratos com clientes'
WAITFOR DELAY '00:00:02'

EXEC pr_task_create @name = 'Realizar pesquisa de satisfação do usuário'
WAITFOR DELAY '00:00:02'