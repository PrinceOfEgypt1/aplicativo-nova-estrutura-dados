# Definir diretórios e nome do arquivo de backup
$sourcePath = "C:\Users\Projetos\aplicativo-nova-estrutura-dados\src"
$backupFileName = "backup_aplicativo-nova-estrutura-dados-src-011224.zip"  # Alterado para .zip
$backupDestination = "C:\Backup\"  # Você pode alterar para outro destino, se necessário

# Criar o diretório de destino se ele não existir
if (!(Test-Path -Path $backupDestination)) {
    New-Item -ItemType Directory -Path $backupDestination
}

# Caminho completo do arquivo de backup
$backupFilePath = Join-Path -Path $backupDestination -ChildPath $backupFileName

# Realizar o backup
try {
    # Compactar e salvar no arquivo de backup
    Compress-Archive -Path $sourcePath\* -DestinationPath $backupFilePath -Force
    Write-Host "Backup concluído com sucesso! Arquivo salvo em: $backupFilePath" -ForegroundColor Green
} catch {
    Write-Host "Erro ao realizar o backup: $_" -ForegroundColor Red
}
