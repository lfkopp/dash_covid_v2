#%% 
import pandas as pd
from datetime import datetime as dt
# %%
df = pd.read_excel('dados_covid.xlsx')
df.shape
# %%
df.columns
# %%
df['dataNotificacao'] = pd.to_datetime(df['dataNotificacao'], utc=False,dayfirst=True).dt.date
df['dataInicioSintomas'] = pd.to_datetime(df['dataInicioSintomas'], utc=False,dayfirst=True).dt.date
# %%
df.head()
# %%
df_conta = pd.DataFrame(df.groupby('dataInicioSintomas')['classificacaoFinal'].count())
df_conta.rename(columns={'classificacaoFinal':'diario'}, inplace=True)
df_conta['acumulado'] = df_conta['diario'].cumsum()
df_conta['7_dias'] = df_conta['diario'].rolling(7).mean()
df_conta['14_dias'] = df_conta['diario'].rolling(14).mean()
df_conta[['7_dias','14_dias','diario']].plot()
# %%
def conta(df,mun='RJ',onlyObito=False):
    if mun != 'RJ':
        df = df[df['municipio'] == mun]
    if onlyObito:
        df = df[df['evolucaoCaso'] == 'OBITO']
    df = pd.DataFrame(df.groupby('dataInicioSintomas')['classificacaoFinal'].count())
    df.rename(columns={'classificacaoFinal':'diario'}, inplace=True)
    df['acumulado'] = df['diario'].cumsum()
    df['7_dias'] = df['diario'].rolling(7).mean()
    df['14_dias'] = df['diario'].rolling(14).mean()
    return df
# %%
df.tail(1000).groupby('municipio')['municipio'].count().sort_values()
# %%
for mun in ['RJ','RIO DE JANEIRO','NITEROI','DUQUE DE CAXIAS']:
    for obito in [False,True]:
        filename = 'conta_'+mun.replace(' ','_')
        if obito:
            filename += '_obito'
        print(filename)
        df_x = conta(df,mun,obito).fillna(0)
        df_x[['7_dias','14_dias','diario']].plot()
        df_x.to_json(filename+'.json')
# %%
