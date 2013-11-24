class ConversaoDeData
	def stringToDateEvento(data)
		stringCortada = data.split("/")
		return "#{stringCortada[1]}-#{stringCortada[0]}-01".to_time
	end

	def conversaoPtBrEn(data)
		if data.blank?
			return nil
		else

			dataSplit = data.split("/")
			return "#{dataSplit[2]}-#{dataSplit[1]}-#{dataSplit[0]}".to_time
		end
	end
end
